using DAL.Constants;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using SixLabors.ImageSharp.Formats.Jpeg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{


    public class ImageService : IImageService
    {
        public async Task<string> SaveImageAsync(string base64,string pathName)
        {
            int quality = 100;
            string fileNameToSend = string.Empty;
            string fileName = string.Empty;

            try
            {
                if (base64 != null)
                {
                    var fileExp = ".jpg"; // Используйте расширение файла, подходящее для JPEG
                    var dir = Path.Combine(Directory.GetCurrentDirectory(), pathName);

                    var file_id = Guid.NewGuid();
                    fileNameToSend = file_id.ToString();

                    List<Qualities.QualitiesSelector> list = new List<Qualities.QualitiesSelector>
                    {
                        Qualities.QualitiesSelector.LOW,
                        Qualities.QualitiesSelector.HIGH
                    };

                    foreach (Qualities.QualitiesSelector sharp in list)
                    {
                        byte[] byteBuffer = Convert.FromBase64String(base64);

                        

                        using (var image = SixLabors.ImageSharp.Image.Load(byteBuffer))
                        {
                            // Выполните изменение размера изображения, если требуется
                            image.Mutate(x => x.Resize(new ResizeOptions { Size = new SixLabors.ImageSharp.Size((int)sharp, (int)sharp), Mode = ResizeMode.Max }));

                            // Сохраните сжатое изображение с помощью кодека JPEG с настраиваемым качеством сжатия
                            var encoder = new JpegEncoder { Quality = quality };
                            fileName = string.Format(@"{0}", file_id + "_" + (int)sharp + fileExp);

                            image.Save(Path.Combine(dir, fileName), encoder);
                        }

                    }

                    return fileNameToSend;
                }
            }
            catch (Exception ex)
            {
                // Обработайте исключения по вашему усмотрению
            }

            return fileName;
        }

        //public async Task<string> GetImageByFilenameAsync(string name, string path)
        //{
        //    string fileName = string.Empty;

        //    try
        //    {
        //        if (name != null)
        //        {
        //            var fileExp = ".jpg"; // Используйте расширение файла, подходящее для JPEG
        //            var dir = Path.Combine(Directory.GetCurrentDirectory(), path);


        //            List<Qualities.QualitiesSelector> list = new List<Qualities.QualitiesSelector>
        //            {
        //                Qualities.QualitiesSelector.LOW,
        //                Qualities.QualitiesSelector.NORMAL,
        //                Qualities.QualitiesSelector.HIGH
        //            };

        //            string port = string.Empty;
        //            if (.Host.Port != null)
        //                port = ":" + Request.Host.Port.ToString();
        //            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";

        //            return name;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Обработайте исключения по вашему усмотрению
        //    }

        //    return fileName;
        //}
    }
}
