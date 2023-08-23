import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "../EditProfile/index.css"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import BreadcrumbsLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface UserPageRequest{
    firstName: string,
    lastName: string,
    middleName : string,
    gender : string,
    birthday : string,
    
    phoneNumber: string,
    email: string,
    
    country: string,
    city: string,
    street:string,
    houseNumber:string,
    postCode:string
}

const breadcrumbs = [
    <BreadcrumbsLink underline="hover" key="1" color="inherit" href="/">
      Головна
    </BreadcrumbsLink>,
    <BreadcrumbsLink
      underline="hover"
      key="2"
      color="inherit"
      href="../profile"
     >
      Профіль
    </BreadcrumbsLink>,
    <Typography key="3" color="text.primary">
      Особисті дані
    </Typography>,
  ];

const EditProfile: React.FC = () => {
    const submitHandler = async (data:React.FormEvent<HTMLFormElement>) => {
        data.preventDefault()
        // var navigate = useNavigate();
        var curentData = new FormData(data.currentTarget);

        var firstName = curentData?.get("firstName")?.toString()!;
        var lastName = curentData?.get("lyastName")?.toString()!;
        var middleName = curentData?.get("middleName")?.toString()!;
        var gender = curentData?.get("gender")?.toString()!;
        var birthday = curentData?.get("birthday")?.toString()!;

        var phoneNumber = curentData?.get("phoneNumber")?.toString()!;
        var email = curentData?.get("email")?.toString()!;

        var country = curentData?.get("country")?.toString()!;
        var city = curentData?.get("city")?.toString()!;
        var street = curentData?.get("street")?.toString()!;
        var houseNumber = curentData?.get("houseNumber")?.toString()!;
        var postCode = curentData?.get("postCode")?.toString()!;

        var request:UserPageRequest = { firstName:firstName,lastName:lastName,middleName:middleName,gender:gender,birthday:birthday,phoneNumber:phoneNumber,email:email,country:country,city:city,street:street,houseNumber:houseNumber,postCode:postCode};

        // navigate("/products");
      }
  return (
    <div className='style'>
        <div className="breadCrumbsStyle">
            <Stack spacing={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
        </div>
        <div>
            <div className='label'>Особисті дані</div>
            <div>   
                <svg className='avatar' xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                    <circle cx="178" cy="178" r="177.5" fill="url(#pattern0)" fill-opacity="0.6" stroke="#D9D9D9"/>
                   
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_1_3385" transform="scale(0.00195312)"/>
                        </pattern>
                        
                        
                        <image  id="image0_1_3385" width="512" height="512" xlinkHref="data:image/png;base64,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AJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRVyAIgSVKFLACSJFXIAiBJUoUsAJIkVcgCIElShSwAkiRV6P8DcXNCrWkZTWUAAAAASUVORK5CYII="/>
                        <div>
                            <input type="file" id="avatar-input"/>
                            <button id="upload-button">Upload Avatar</button>
                        </div> 
                    </defs>
                    
                </svg>
               
            </div>
           

            

            <input type="text" className="userNameInput" placeholder="Імʼя користувача"/>
        </div>
        <div>
            <div className='personalInfolabel label-1'>Персональна інформація</div>
            <div>
                <input type="text" className="personalInfoInput input-1" placeholder="Імʼя "/>
                <input type="text" className="personalInfoInput input-2" placeholder="Прізвище"/>
                <input type="text" className="personalInfoInput input-3" placeholder="По-батькові"/>
                <input type="text" className="personalInfoInput input-4" placeholder="Стать"/>
                <input type="date" className="personalInfoInput input-5" placeholder="Дата народження"/>  
            </div>
        </div>
        <div>
            <div className='personalInfolabel label-2'>Контактні дані</div>
            <div>
                <input type="text" className="personalInfoInput input-6" placeholder="Номер телефону "/>
                <input type="text" className="personalInfoInput input-7" placeholder="E-mail"/>
            </div>
        </div>
        <div>
            <div className='personalInfolabel label-3'>Адреса доставки</div>
            <div>
                <input type="text" className="personalInfoInput input-8" placeholder="Країна"/>
                <input type="text" className="personalInfoInput input-9" placeholder="Місто"/>
                <input type="text" className="personalInfoInput input-10" placeholder="Вулиця"/>
                <input type="text" className="personalInfoInput input-11" placeholder="Номер будинку/квартири"/>
                <input type="text" className="personalInfoInput input-12" placeholder="Номер відділення"/>
            </div>
        </div>
        <div className='plusSvg'>   
            <svg width="70" height="70" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="24.5" fill="#FF9C00" stroke="#FF9A02"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.6892 22.973V12.5H22.973V22.973H12.5V26.6892H22.973V37.5H26.6892V26.6892H37.5V22.973H26.6892Z" fill="white"/>
            </svg>
        </div>
    </div>

  )
}

export default EditProfile