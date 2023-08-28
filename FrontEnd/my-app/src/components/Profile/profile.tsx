import React, { useRef, useState } from 'react';

import "./index.css";
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import BreadcrumbsLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



const ProfilePage: React.FC = () => {

  const breadcrumbs = [
    <BreadcrumbsLink underline="hover" key="1" color="inherit" href="/">
      Головна
    </BreadcrumbsLink>,

    <Typography key="3" color="text.primary">
      Профіль
    </Typography>,
  ];

  return (
    <div>
        <div className="breadCrumbsStyle">
            <Stack spacing={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
        </div>
      <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
        <Link to="/editprofile">
          <div style={{ borderWidth: "2px", borderRadius: "20px", height: "250px", width: "450px", marginLeft: "250px", marginTop: "70px", display: "inline-flex" }}>
    <div >

      <div className="overhead" style={{ marginTop: "90px", display: "flex", width: "100%" }}>
        <Link to="/editprofile">
          <div className="dataprof" >
            <svg style={{ marginLeft: "30px", marginTop: "60px" }} width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.5625 54.3438C58.7837 54.3438 67.0625 46.065 67.0625 35.8438C67.0625 25.6225 58.7837 17.3438 48.5625 17.3438C38.3412 17.3438 30.0625 25.6225 30.0625 35.8438C30.0625 46.065 38.3412 54.3438 48.5625 54.3438ZM48.5625 26.5938C53.65 26.5938 57.8125 30.7562 57.8125 35.8438C57.8125 40.9312 53.65 45.0938 48.5625 45.0938C43.475 45.0938 39.3125 40.9312 39.3125 35.8438C39.3125 30.7562 43.475 26.5938 48.5625 26.5938ZM20.8125 82.0938C21.7375 79.18 32.6987 74.3237 43.7525 73.1212L53.1875 63.8713C51.3838 63.6863 50.0425 63.5938 48.5625 63.5938C36.2137 63.5938 11.5625 69.7912 11.5625 82.0938V91.3438H53.1875L43.9375 82.0938H20.8125ZM92.9625 56.6562L69.2363 80.5675L59.6625 70.9475L53.1875 77.4688L69.2363 93.6562L99.4375 63.1775L92.9625 56.6562Z" fill="#6B6A6E" />
            </svg>
            <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "30px", color: "#6B6A6E" }}>Особисті дані</a>
          </div>
        </Link>
        <Link to="/payment">
          <div style={{ borderWidth: "2px", borderRadius: "20px", height: "250px", width: "450px", marginLeft: "20px", marginTop: "70px", display: "inline-flex" }}>
          <div className="paymcards">
            <svg style={{ marginLeft: "30px", marginTop: "60px" }} width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M109.167 21.8333H21.8334C15.7747 21.8333 10.9713 26.6912 10.9713 32.7499L10.9167 98.2499C10.9167 104.309 15.7747 109.167 21.8334 109.167H109.167C115.226 109.167 120.083 104.309 120.083 98.2499V32.7499C120.083 26.6912 115.226 21.8333 109.167 21.8333ZM109.167 98.2499H21.8334V65.4999H109.167V98.2499ZM109.167 43.6666H21.8334V32.7499H109.167V43.6666Z" fill="#6B6A6E" />
            </svg>
            <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "30px", color: "#6B6A6E" }}>Мої картки</a>
          </div>
        </Link>
        <Link to="">
          <div style={{ borderWidth: "2px", borderRadius: "20px", height: "250px", width: "450px", marginLeft: "20px", marginTop: "70px", display: "inline-flex" }}>
        <Link to="/proforder">
          <div className="cardsord">
            <svg style={{ marginLeft: "30px", marginTop: "60px" }} width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.7917 72.6666H63.5833V81.7499H31.7917V72.6666ZM31.7917 54.4999H77.2083V63.5833H31.7917V54.4999ZM31.7917 36.3333H77.2083V45.4166H31.7917V36.3333ZM86.2917 18.1666H67.3075C65.4 12.8983 60.4042 9.08325 54.5 9.08325C48.5958 9.08325 43.6 12.8983 41.6925 18.1666H22.7083C22.0725 18.1666 21.4821 18.212 20.8917 18.3483C19.1204 18.7116 17.5308 19.6199 16.3046 20.8462C15.4871 21.6637 14.8058 22.6628 14.3517 23.7528C13.8975 24.7974 13.625 25.9783 13.625 27.2499V90.8333C13.625 92.0595 13.8975 93.2858 14.3517 94.3758C14.8058 95.4658 15.4871 96.4195 16.3046 97.2824C17.5308 98.5087 19.1204 99.417 20.8917 99.7803C21.4821 99.8712 22.0725 99.9166 22.7083 99.9166H86.2917C91.2875 99.9166 95.375 95.8291 95.375 90.8333V27.2499C95.375 22.2541 91.2875 18.1666 86.2917 18.1666ZM54.5 17.0312C56.3621 17.0312 57.9062 18.5753 57.9062 20.4374C57.9062 22.2995 56.3621 23.8437 54.5 23.8437C52.6379 23.8437 51.0938 22.2995 51.0938 20.4374C51.0938 18.5753 52.6379 17.0312 54.5 17.0312ZM86.2917 90.8333H22.7083V27.2499H86.2917V90.8333Z" fill="#6B6A6E" />
            </svg>
            <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "30px", color: "#6B6A6E" }}>Історія покупок</a>
          </div>
        </Link>


      </div>
      <div className="botdiv" style={{ marginTop: "20px", display: "flex" }}>
        <Link to="/security">
          <div className="cardsbot" >
            <svg style={{ marginLeft: "30px", marginTop: "60px" }} width="141" height="141" viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M133.103 111.564L79.7581 58.2187C85.2218 44.4712 82.4018 28.2562 71.2981 17.0937C57.7856 3.5812 36.7531 2.34745 21.7718 13.275L44.3318 35.8937L35.9893 44.1775L13.4881 21.6762C2.56058 36.5987 3.79434 57.69 17.3068 71.1437C28.2343 82.0712 44.1556 84.95 57.7856 79.8387L111.307 133.36C113.598 135.651 117.299 135.651 119.591 133.36L133.103 119.847C135.453 117.615 135.453 113.914 133.103 111.564ZM115.478 120.964L59.9006 65.3862C56.3168 68.03 52.3218 69.6162 48.1506 70.2037C40.1606 71.3787 31.7593 68.97 25.6493 62.86C20.0681 57.3375 17.4831 49.935 17.8943 42.65L36.0481 60.8037L60.9581 35.8937L42.8043 17.74C50.0893 17.3287 57.4331 19.9137 63.0143 25.4362C69.3593 31.7812 71.7681 40.535 70.2993 48.7012C69.5943 52.8725 67.8318 56.75 65.1293 60.2162L120.648 115.735L115.478 120.964Z" fill="#6B6A6E" />
            </svg>
            <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "30px", color: "#6B6A6E" }}>Логін та безпека</a>
          </div>
        </Link>
        <Link to="">
          <div className="cardshelp" >
            <svg style={{ marginLeft: "30px", marginTop: "60px" }} width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M65 5.41675L16.25 27.0834V59.5834C16.25 89.6459 37.05 117.758 65 124.583C92.95 117.758 113.75 89.6459 113.75 59.5834V27.0834L65 5.41675ZM102.917 59.5834C102.917 69.6043 100.154 79.3542 95.4417 87.8042L87.5875 79.9501C94.575 69.4417 93.3833 55.1418 84.1208 45.8793C73.5583 35.3168 56.3875 35.3168 45.825 45.8793C35.2625 56.4418 35.2625 73.6126 45.825 84.1751C55.0875 93.4376 69.3875 94.5751 79.8958 87.6418L89.2125 96.9584C82.7667 104.65 74.425 110.554 65 113.425C43.225 106.654 27.0833 84.0667 27.0833 59.5834V34.1251L65 17.2792L102.917 34.1251V59.5834ZM65 81.2501C56.0083 81.2501 48.75 73.9918 48.75 65.0001C48.75 56.0084 56.0083 48.7501 65 48.7501C73.9917 48.7501 81.25 56.0084 81.25 65.0001C81.25 73.9918 73.9917 81.2501 65 81.2501Z" fill="#666666" />
            </svg>
            <a style={{ fontSize: "40px", fontWeight: "600", marginTop: "80px", marginLeft: "30px", color: "#6B6A6E" }}>Допомога</a>
          </div>
        </Link>


      </div>


    </div>

  );
};

export default ProfilePage;

// <div className="divlist"></div>


// <div className="divlist"></div>
