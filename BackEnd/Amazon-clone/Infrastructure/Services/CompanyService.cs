using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository companyRepository, IUserRepository userRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _userRepository = userRepository;
            _mapper = mapper;
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
            var company = await _companyRepository.GetById((int)user.CompanyId);
            return company;
        }

        public async Task<Company> AddUserToCompanyAsync(AddUserToCompanyDTO model)
        {
            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
            var company = _companyRepository.GetAll().Include(comp=>comp.Users).FirstOrDefault(comp=>comp.Id== model.CompanyId);
            user.CompanyId = company.Id;
            await _userRepository.UpdateUserAsync(user);
            return company;
        }
    }
}
