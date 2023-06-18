using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Services;
using SixLabors.ImageSharp.Formats.Jpeg;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly IProductImageRepository _productImageRepository;

        public ProductImageService(IProductImageRepository productImageService)
        {
            _productImageRepository = productImageService;
        }


        public async Task<string> CreateProductImageAsync(ProductImage img)
        {
            try
            {
                await _productImageRepository.Create(img);

                return "created";
            }
            catch
            {
                return null;
            }
        }

        public string GetBase64ByName(string name)
        {
            try
            {
                var dir = Path.Combine(Directory.GetCurrentDirectory(), "images", name);

                var bytesOfImage = File.ReadAllBytes(dir);

                var stringBytes = Convert.ToBase64String(bytesOfImage);

                //await _productImageService.Create(new ProductImage { });

                return  stringBytes;
            }
            catch
            {
                return null;
            }
        }

        public async Task<ProductImage> GetMainImageByIdAsync(int id)
        {
            var img = _productImageRepository.GetAll().Where(img=>img.ProductId==id).FirstOrDefault(img=>img.IsMainImage==true);
            return img;
        }

        public Task<ServiceResponse> GetProductImageAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<string> SaveImageAsync(string imgName)
        {
            int quality = 85;
            string fileName = string.Empty;

            try
            {
                if (imgName != null)
                {
                    var fileExp = ".jpg"; // Используйте расширение файла, подходящее для JPEG
                    var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
                    fileName = string.Format(@"{0}" + fileExp, Guid.NewGuid());

                    byte[] byteBuffer = Convert.FromBase64String(imgName);

                    using (var image = SixLabors.ImageSharp.Image.Load(byteBuffer))
                    {
                        // Выполните изменение размера изображения, если требуется
                        image.Mutate(x => x.Resize(new ResizeOptions { Size = new SixLabors.ImageSharp.Size(250, 250), Mode = ResizeMode.Max }));

                        // Сохраните сжатое изображение с помощью кодека JPEG с настраиваемым качеством сжатия
                        var encoder = new JpegEncoder { Quality = quality };
                        image.Save(Path.Combine(dir, fileName), encoder);
                    }

                    return fileName;
                }
            }
            catch (Exception ex)
            {
                // Обработайте исключения по вашему усмотрению
            }

            return fileName;
        }

        //public async Task<string> SaveImageAsync(string imgName)
        //{
        //    string fileName = string.Empty;

        //    try
        //    {
        //        if (imgName != null)
        //        {
        //            var fileExp = ".png";
        //            var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
        //            var mainFileName = Guid.NewGuid();
        //            fileName = string.Format(@"{0}" + fileExp, mainFileName);
        //            var fileResizeName = string.Format(@"{0}" + fileExp, mainFileName+"_250");


        //            byte[] byteBuffer = Convert.FromBase64String(imgName);
        //            System.IO.File.WriteAllBytes(Path.Combine(dir, fileName), byteBuffer);


        //            System.Drawing.Image myImg = LoadBase64(imgName);

        //            using (var image = SixLabors.ImageSharp.Image.Load(byteBuffer))
        //            {
        //                // Выполните изменение размера изображения, если требуется
        //                image.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(250, 250), Mode = ResizeMode.Max }));

        //                // Сохраните сжатое изображение с помощью кодека JPEG с настраиваемым качеством сжатия
        //                var encoder = new JpegEncoder { Quality = quality };
        //                image.Save(Path.Combine(dir, fileName), encoder);
        //            }

        //            Image.Load
        //            var img__ = myImg.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(250, 250), Mode = ResizeMode.Max }));

        //            System.Drawing.Image resizedImg = resizeImage(myImg, new System.Drawing.Size(250, 250));
        //            var resizedBase64 = GetStringFromImage(resizedImg);
        //            byte[] byteBufferResizedImg = Convert.FromBase64String(resizedBase64);


        //            System.IO.File.WriteAllBytes(Path.Combine(dir, fileResizeName), byteBufferResizedImg);



        //            return mainFileName.ToString();

        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //    }

        //    return fileName;
        //}

        public static string GetStringFromImage(System.Drawing.Image image)
        {
            if (image != null)
            {
                ImageConverter ic = new ImageConverter();
                byte[] buffer = (byte[])ic.ConvertTo(image, typeof(byte[]));
                return Convert.ToBase64String(
                    buffer,
                    Base64FormattingOptions.InsertLineBreaks);
            }
            else
                return null;
        }

        public byte[] ImageToByteArray(System.Drawing.Image imageIn)
        {
            using (var ms = new MemoryStream())
            {
                imageIn.Save(ms, imageIn.RawFormat);
                return ms.ToArray();
            }
        }

        public static System.Drawing.Image LoadBase64(string base64)
        {
            byte[] bytes = Convert.FromBase64String(base64);
            System.Drawing.Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = System.Drawing.Image.FromStream(ms);
            }
            return image;
        }

        public static System.Drawing.Image resizeImage(System.Drawing.Image imgToResize, System.Drawing.Size size)
        {
            var resizedImage = new Bitmap(size.Width, size.Height);

            using (var graphics = Graphics.FromImage(resizedImage))
            {
                graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                graphics.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

                graphics.DrawImage(imgToResize, 0, 0, size.Width, size.Height);
            }

            return resizedImage;
        }

        public async Task DeleteAllImagesByProductId(int id)
        {
            var toDelete = _productImageRepository.GetAll().Where(img => img.ProductId == id).ToList();
            toDelete.ForEach(img => _productImageRepository.Delete(img.Id));
        }
    }
}
