using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IUserRepository _userRepository;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository companyRepository, IUserRepository userRepository, IMapper mapper, IImageService imageService)
        {
            _companyRepository = companyRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<List<CompanyVM>> GetAllCompaniesAsync()
        {
            var companies = _companyRepository.GetAll().Include(comp => comp.Users).ToList();
            var companiesVms = new List<CompanyVM>();

            foreach (var item in companies)
            {
                var usersVm = _mapper.Map<List<User>, List<AllUsersVM>>(item.Users.ToList());
                var companyVm = _mapper.Map<Company, CompanyVM>(item);
                companyVm.Users = usersVm;
                companiesVms.Add(companyVm);
            }
            return companiesVms;
        }

        public async Task<CompanyVM> AddCompanyAsync(CompanyDTO model)
        {
            var company = _mapper.Map<CompanyDTO, Company>(model);
            company.CreatorId = model.UserId;

            var comp = _companyRepository.GetAll().FirstOrDefault(comp => comp.CreatorId == model.UserId);
            
            if(comp != null) { return null; }

            await _companyRepository.Create(company);

            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
            user.isBossOfCompany= true;
            user.CompanyId= company.Id;
            await _userRepository.UpdateUserAsync(user);

            var companyVM = _mapper.Map<Company, CompanyVM>(company);

            return companyVM;
        }


        public async Task<Company> GetCompanyByUserIdAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId.ToString());
            if (user != null)
            {
                var company = await _companyRepository.GetById((int)user.CompanyId);
                return company;
            }
            return null;
        }

        public async Task<ServiceResponse> AddUserToCompanyAsync(AddUserToCompanyDTO model)
        {
            var user = await _userRepository.GetUserByEmailAsync(model.UserEmail);
            var company = _companyRepository.GetAll().Include(comp=>comp.Users).FirstOrDefault(comp=>comp.Id == model.CompanyId);
            
            if (user != null)
            {
                if(user.CompanyId != null)
                {
                    return new ServiceResponse()
                    {
                        IsSuccess= false,
                        Message = "Користувач вже має компанію."
                    };
                }
                
                user.CompanyId = company.Id;
                await _userRepository.UpdateUserAsync(user);
            }
            else
            {
                return new ServiceResponse()
                {
                    Message = "Такого користувача не існує .",
                    IsSuccess = false
                };
            }

            var companyVm = _mapper.Map<Company,CompanyVM>(company);

            return new ServiceResponse()
            {
                Payload = companyVm,
                Message = "Успішно.",
                IsSuccess = true
            };

        }

        public async Task<CompanyVM> AddImageByCompanyIdAsync(ImageForCompanyDTO model)
        {
            var filename = await _imageService.SaveImageAsync(model.Image, DirectoriesInProject.CompanyImages);
            var company = await _companyRepository.GetById(model.CompanyId);
            company.Image = filename;
            await _companyRepository.Update(company);

            var companyVm = _mapper.Map<Company, CompanyVM>(company);
            return companyVm;
        }

        public async Task<ServiceResponse> LeaveCompanyByUserIdAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId.ToString());
            
            if(user == null)
            {
                return new ServiceResponse() { Message = "Користувача не знайденно!" };
            }

            user.CompanyId = 0;
            await _userRepository.UpdateUserAsync(user);


            return new ServiceResponse() { Message="Ви покінули компанію!"};
        }
    }
}
