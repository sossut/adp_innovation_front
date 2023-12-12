"use strict";

const apiKey = "GH9mE4ye.eOeYY8AiUMpxht9DzDCIU7FNHBwVvUGY.";
const cors = "https://corsproxy.io/?";
const blah = async () => {
  const array = [];
  let i = 1;
  let ifTrue = true;
  while (ifTrue) {
    const response = await fetch(
      cors +
        "https://paikkatietohaku.api.hel.fi/v1/postal_code_area/?area=true&page=" +
        i,
      {
        headers: {
          Authorization:
            "Bearer Api-Key GH9mE4ye.eOeYY8AiUMpxht9DzDCIU7FNHBwVvUGY",
        },
      }
    );
    const result = await response.json();
    console.log(result);

    i++;
    for (let i = 0; i < result.results.length; i++) {
      if (result.results[i].postal_code.startsWith("03")) {
        ifTrue = false;
      } else {
        array.push(result.results[i]);
      }
    }
    if (result.next === null) {
      ifTrue = false;
    }
  }

  array.splice(125, 8);

  const espoo = [];
  const helsinki = [];
  const vantaa = [];
  const kauniainen = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].postal_code.startsWith("00")) {
      helsinki.push(array[i]);
    } else if (array[i].postal_code.startsWith("01")) {
      vantaa.push(array[i]);
    } else {
      if (array[i].postal_code === "02700") {
        kauniainen.push(array[i]);
      } else {
        espoo.push(array[i]);
      }
    }
  }

  const postPostCodes = async (array, cityID) => {
    for (let i = 0; i < array.length; i++) {
      const data = {
        code: array[i].postal_code,
        name: array[i].name.fi,
        city_id: cityID,
        area: JSON.stringify(array[i].area.coordinates[0][0]),
      };
      const json = JSON.stringify(data);

      const response2 = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/postcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoidGVzdGkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIxMzYyNDN9.YFcvfFDN-Kzn0MiSczGzejViTSTy0ax0dkNfhd7qt1I",
          },
          body: json,
        }
      );
    }
  };
  // await postPostCodes(helsinki, 1);
  // await postPostCodes(espoo, 2);
  // await postPostCodes(vantaa, 3);
  // await postPostCodes(kauniainen, 4);
  const getPostCodes = async () => {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/postcode/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {}
  };

  // const postcodes = await getPostCodes();
  // console.log(postcodes);
  // postcodes.forEach(async (postcode) => {
  //   array.forEach(async (element) => {
  //     if (element.postal_code === postcode.code) {
  //       try {
  //         const response = await fetch(
  //           "https://shtsvr.mooo.com/adp/api/v1/postcode/" + postcode.id,
  //           {
  //             method: "PUT",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //             body: JSON.stringify({
  //               area: JSON.stringify(element.area.coordinates[0][0]),
  //             }),
  //           }
  //         );
  //         const result = await response.json();
  //         console.log(result);
  //       } catch (error) {}
  //     }
  //   });
  // });
};
blah();
const getCoordinates = async () => {
  const response = await fetch(
    cors +
      `https://paikkatietohaku.api.hel.fi/v1/address/?municipality=Espoo&streetname=Kiiskitie&streetnumber=5`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer Api-Key GH9mE4ye.eOeYY8AiUMpxht9DzDCIU7FNHBwVvUGY",
      },
    }
  );
  const result = await response.json();
  return result;
};
// getCoordinates();
// const bleh = async () => {
//   const response = await fetch("http://localhost:5000/api/v1/housing-company", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoidGVzdGkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAxNTMwNzYsImV4cCI6MTcwMDIzOTQ3Nn0.8_FDxNcAn6ofgSDQ35EndeDQr0C9LER7BAI9rQsxmzo",
//     },
//   });
//   const result = await response.json();
//   console.log(result);
//   console.log(JSON.parse(result[0].address));
// };
// bleh();

// const bleeeh = async () => {
//   let i = 1;
//   let ifTrue = true;
//   while (ifTrue) {
//     const response = await fetch(
//       cors + "https://paikkatietohaku.api.hel.fi/v1/municipality/?page=" + i,
//       {
//         headers: {
//           Authorization:
//             "Bearer Api-Key GH9mE4ye.eOeYY8AiUMpxht9DzDCIU7FNHBwVvUGY",
//         },
//       }
//     );
//     i++;
//     const result = await response.json();
//     console.log(i, result);
//     if (result.next === null) {
//       ifTrue = false;
//     }
//   }
// };
// bleeeh();
{
  /* <style>
    #container {
    }
    .edit-housing-company-button {
        background-color: black;
        padding: 0.1rem
    }
    .housing-company {
        display: flex;
        justify-content: space-between
    }
</style>

<div id="container">
    <div class="housing-companies">

    </div>
</div>
<script> */
}

const getAndRenderHousingCompanies = async () => {
  const getHousingCompanies = async () => {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/housing-company/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {}
  };
  try {
    const housingCompaniesDiv = document.querySelector(".housing-companies");

    const housingCompanies = await getHousingCompanies();
    if (housingCompanies.message === "No housing companies found") {
      const emptyMessage = document.createElement("p");
      emptyMessage.innerHTML = "Ei taloyhtiöitä";
      housingCompaniesDiv.appendChild(emptyMessage);
      return;
    }
    //Taloyhtiö sivun container

    //Taloyhtiöiden div
    housingCompanies.forEach((element) => {
      //jokaiselle taloyhtiölle div
      const housingCompanyDiv = document.createElement("div");
      housingCompanyDiv.classList.add("housing-company");
      //jokaiselle taloyhtiölle muokkaa nappi
      const editHousingCompanyButton = document.createElement("button");
      editHousingCompanyButton.classList.add("edit-housing-company-button");
      //taloyhtiön tietojen div
      const housingCompanyDataDiv = document.createElement("div");
      housingCompanyDataDiv.classList.add("housing-company-data");
      console.log(element.postcode.code);
      housingCompanyDataDiv.innerHTML = `${element.NAME}, ${element.address.street} ${element.address.number}, ${element.postcode.code} ${element.city.name}`;
      editHousingCompanyButton.innerHTML = "Muokkaa";
      housingCompanyDiv.appendChild(housingCompanyDataDiv);
      housingCompanyDiv.appendChild(editHousingCompanyButton);
      housingCompaniesDiv.appendChild(housingCompanyDiv);
    });
  } catch (error) {}
};
// getAndRenderHousingCompanies();

// const getUserData = async () => {
//   try {
//     const response = await fetch(
//       "https://adp2.onrender.com/api/v1/user/current",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcl9uYW1lIjoidGVzdGkyIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAxNDM2Mzg2fQ.OBsxqRLjj86Zu2aXpklPIGtlbac-sQjCjakfU64qn-A`, // Include any necessary authentication headers
//         },
//       }
//     );

//     const result = await response.json();
//     console.log(result);
//     document.getElementById("nimi").textContent = result.user_name;
//     document.getElementById("sposti").textContent = result.email;
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Call the function to get user data
// getUserData();
