// Functions
// country change function
// const handleCountryChange = (e) => {
//   // Get the country selected and set it
//   const countryCode = e.target.value;
//   setSelectedCountry(countryCode);
//   // Check if country code is available and set it
//   const country = countries.find((c) => c.code === countryCode);
//   if (country) {
//     setSelectedPhoneCode(country.phoneCode);
//   } else {
//     setSelectedPhoneCode("");
//   }
//   // Update FormData to reflect the selected country immediately
//   setDonateFormData((prev) => ({
//     ...prev,
//     country: countryCode, // Update the country field in FormData (using the value itself not the selected country state)
//     phoneCode: country ? country.phoneCode : prev.phoneCode, // Update the phone code in FormData
//   }));
// };

// {
//   /* Search input */
// }
// <div>
//   <Input
//     type="text"
//     placeholder="Search Country or Code"
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     className=""
//   />
// </div>;
// {
//   /* Country */
// }
// <div>
//   <select
//     id="country"
//     name="country"
//     value={selectedCountry}
//     onChange={handleCountryChange}
//     className="input-field"
//     required
//   >
//     <option value="">Select a country *</option>
//     {filteredCountries.map((country) => (
//       <option key={country.code} value={country.code}>
//         {country.name} ({country.code}){" "}
//       </option>
//     ))}
//   </select>
// </div>;
// {
//   /* PhoneNumber */
// }
// <div className="flex md:w-1/2 w-full">
//   <div className=" w-1/8">
//     <select
//       id="phoneCode"
//       name="phoneCode"
//       value={selectedPhoneCode}
//       onChange={(e) => {
//         const newPhoneCode = e.target.value;
//         setSelectedPhoneCode(newPhoneCode);
//         // console.log(selectedPhoneCode);
//         setDonateFormData((prev) => ({
//           ...prev,
//           phoneCode: newPhoneCode, //Use the value gotten directly from the field (and not the updated state)to avoid logging older values, due to Reacts asynchronus state variables
//         }));
//       }}
//       className="input-field"
//     >
//       <option value="">Code</option>
//       {countries.map((country) => (
//         <option key={country.code} value={country.phoneCode}>
//           {country.code}: {country.phoneCode}
//         </option>
//       ))}
//     </select>
//   </div>
//   <div className="flex-1 mx-2">
//     <input
//       type="tel"
//       id="phoneNumber"
//       name="phoneNumber"
//       value={donateFormData.phoneNumber}
//       onChange={handleInputChange}
//       placeholder="Enter phone number"
//       className="input-field"
//     />
//   </div>
// </div>;
