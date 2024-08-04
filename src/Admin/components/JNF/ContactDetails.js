import { Form, Container } from "react-bootstrap"
import React, { useState ,useEffect } from "react"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_text_max_character_count } from "./limit_constants"

const countryCodes = [
  { code: '+1', name: 'US' },
  { code: '+91', name: 'India' },
  { code: '+44', name: 'UK' },
  { code: '+93', name: 'Afghanistan' },
  { code: '+355', name: 'Albania' },
  { code: '+213', name: 'Algeria' },
  { code: '+376', name: 'Andorra' },
  { code: '+244', name: 'Angola' },
  { code: '+54', name: 'Argentina' },
  { code: '+374', name: 'Armenia' },
  { code: '+61', name: 'Australia' },
  { code: '+43', name: 'Austria' },
  { code: '+994', name: 'Azerbaijan' },
  { code: '+973', name: 'Bahrain' },
  { code: '+880', name: 'Bangladesh' },
  { code: '+375', name: 'Belarus' },
  { code: '+32', name: 'Belgium' },
  { code: '+501', name: 'Belize' },
  { code: '+229', name: 'Benin' },
  { code: '+975', name: 'Bhutan' },
  { code: '+591', name: 'Bolivia' },
  { code: '+387', name: 'Bosnia and Herzegovina' },
  { code: '+267', name: 'Botswana' },
  { code: '+55', name: 'Brazil' },
  { code: '+673', name: 'Brunei' },
  { code: '+359', name: 'Bulgaria' },
  { code: '+226', name: 'Burkina Faso' },
  { code: '+257', name: 'Burundi' },
  { code: '+855', name: 'Cambodia' },
  { code: '+237', name: 'Cameroon' },
  { code: '+1', name: 'Canada' },
  { code: '+238', name: 'Cape Verde' },
  { code: '+236', name: 'Central African Republic' },
  { code: '+235', name: 'Chad' },
  { code: '+56', name: 'Chile' },
  { code: '+86', name: 'China' },
  { code: '+57', name: 'Colombia' },
  { code: '+269', name: 'Comoros' },
  { code: '+242', name: 'Congo' },
  { code: '+243', name: 'Congo, Democratic Republic of the' },
  { code: '+682', name: 'Cook Islands' },
  { code: '+506', name: 'Costa Rica' },
  { code: '+385', name: 'Croatia' },
  { code: '+53', name: 'Cuba' },
  { code: '+357', name: 'Cyprus' },
  { code: '+420', name: 'Czech Republic' },
  { code: '+45', name: 'Denmark' },
  { code: '+253', name: 'Djibouti' },
  { code: '+1-767', name: 'Dominica' },
  { code: '+1-809', name: 'Dominican Republic' },
  { code: '+670', name: 'East Timor' },
  { code: '+593', name: 'Ecuador' },
  { code: '+20', name: 'Egypt' },
  { code: '+503', name: 'El Salvador' },
  { code: '+240', name: 'Equatorial Guinea' },
  { code: '+291', name: 'Eritrea' },
  { code: '+372', name: 'Estonia' },
  { code: '+268', name: 'Eswatini' },
  { code: '+251', name: 'Ethiopia' },
  { code: '+679', name: 'Fiji' },
  { code: '+358', name: 'Finland' },
  { code: '+33', name: 'France' },
  { code: '+241', name: 'Gabon' },
  { code: '+220', name: 'Gambia' },
  { code: '+995', name: 'Georgia' },
  { code: '+49', name: 'Germany' },
  { code: '+233', name: 'Ghana' },
  { code: '+30', name: 'Greece' },
  { code: '+299', name: 'Greenland' },
  { code: '+1-473', name: 'Grenada' },
  { code: '+502', name: 'Guatemala' },
  { code: '+224', name: 'Guinea' },
  { code: '+245', name: 'Guinea-Bissau' },
  { code: '+592', name: 'Guyana' },
  { code: '+509', name: 'Haiti' },
  { code: '+504', name: 'Honduras' },
  { code: '+852', name: 'Hong Kong' },
  { code: '+36', name: 'Hungary' },
  { code: '+354', name: 'Iceland' },
  { code: '+62', name: 'Indonesia' },
  { code: '+98', name: 'Iran' },
  { code: '+964', name: 'Iraq' },
  { code: '+353', name: 'Ireland' },
  { code: '+972', name: 'Israel' },
  { code: '+39', name: 'Italy' },
  { code: '+225', name: 'Ivory Coast' },
  { code: '+81', name: 'Japan' },
  { code: '+962', name: 'Jordan' },
  { code: '+7', name: 'Kazakhstan' },
  { code: '+254', name: 'Kenya' },
  { code: '+686', name: 'Kiribati' },
  { code: '+850', name: 'North Korea' },
  { code: '+82', name: 'South Korea' },
  { code: '+965', name: 'Kuwait' },
  { code: '+996', name: 'Kyrgyzstan' },
  { code: '+856', name: 'Laos' },
  { code: '+371', name: 'Latvia' },
  { code: '+961', name: 'Lebanon' },
  { code: '+266', name: 'Lesotho' },
  { code: '+231', name: 'Liberia' },
  { code: '+218', name: 'Libya' },
  { code: '+423', name: 'Liechtenstein' },
  { code: '+370', name: 'Lithuania' },
  { code: '+352', name: 'Luxembourg' },
  { code: '+853', name: 'Macau' },
  { code: '+389', name: 'North Macedonia' },
  { code: '+261', name: 'Madagascar' },
  { code: '+265', name: 'Malawi' },
  { code: '+60', name: 'Malaysia' },
  { code: '+960', name: 'Maldives' },
  { code: '+223', name: 'Mali' },
  { code: '+356', name: 'Malta' },
  { code: '+692', name: 'Marshall Islands' },
  { code: '+222', name: 'Mauritania' },
  { code: '+230', name: 'Mauritius' },
  { code: '+52', name: 'Mexico' },
  { code: '+691', name: 'Micronesia' },
  { code: '+373', name: 'Moldova' },
  { code: '+377', name: 'Monaco' },
  { code: '+976', name: 'Mongolia' },
  { code: '+382', name: 'Montenegro' },
  { code: '+212', name: 'Morocco' },
  { code: '+258', name: 'Mozambique' },
  { code: '+95', name: 'Myanmar' },
  { code: '+264', name: 'Namibia' },
  { code: '+674', name: 'Nauru' },
  { code: '+977', name: 'Nepal' },
  { code: '+31', name: 'Netherlands' },
  { code: '+64', name: 'New Zealand' },
  { code: '+505', name: 'Nicaragua' },
  { code: '+227', name: 'Niger' },
  { code: '+234', name: 'Nigeria' },
  { code: '+47', name: 'Norway' },
  { code: '+968', name: 'Oman' },
  { code: '+92', name: 'Pakistan' },
  { code: '+680', name: 'Palau' },
  { code: '+970', name: 'Palestine' },
  // Add more countries here
];

const CountryCodeDropdown = ({ countryCode, setCountryCode }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countryCodes.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      setCountryCode("");
    }

    setIsOpen(value !== "");
  };

  return (
    <div style={{ position: "relative", width: "100px" }}>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        placeholder="Country Code"
        style={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          fontSize: "14px",
          position: "relative",
        }}
      />
      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "100%",
            left: 0,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {filteredCountries.length === 0 && (
            <div style={{ padding: "10px", textAlign: "center" }}>No results</div>
          )}
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ced4da",
                backgroundColor: country.code === countryCode ? "#f1f1f1" : "#fff",
              }}
              onMouseDown={() => {
                setCountryCode(country.code);
                setSearch(country.code);
                setIsOpen(false);
              }}
            >
              {country.code} ({country.name})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ContactDetails = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => {
  
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    handleChange({ target: { name: "mobile", value: `${countryCode}-${phoneNumber}` } });
  }, [countryCode, phoneNumber, handleChange]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        {/* <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src="https://www.iitdh.ac.in/sites/default/files/2023-10/slide-02-new_3.jpg"></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              COMPANY CONTACT DETAILS
            </div>
          </div>
        </div> */}
      </Container>
      <hr className="pd" />
      <Form.Group className="mb-5 w-50">
        <Form.Label>Contact Person <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_text_max_character_count} type="text" name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.contact && errors.contact} />
        <Form.Control.Feedback type="invalid"> {errors.contact} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_smalltext_max_character_count} type="text" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && errors.email} />
        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
      </Form.Group> 
      {/* <Form.Group className="mb-5 w-50">
        <Form.Label>Mobile <span className="text-danger">*</span></Form.Label>
        <Form.Control  name='mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.mobile && errors.mobile} />
        <Form.Control.Feedback type="invalid"> {errors.mobile} </Form.Control.Feedback>
      </Form.Group> */}
      <Form.Group className="mb-5">
        <Form.Label>
          Mobile <span className="text-danger">*</span>
        </Form.Label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CountryCodeDropdown countryCode={countryCode} setCountryCode={setCountryCode} />
          <Form.Control
            type="text"
            name="phonenumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={handleBlur}
            isInvalid={touched.mobile && errors.mobile}
            style={{
              width:"35%",
              marginLeft: "10px",
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            placeholder="Enter phone number"
          />
        </div>
        <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
      </Form.Group>
      <style>
        {`
          input::placeholder {
            font-size: 12px; /* Adjust placeholder font size */
          }
        `}
      </style>
      {/* <Form.Group className="mb-5 w-50">
        <Form.Label>Telephone</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="(000) 000-0000" name='telephone' value={values.telephone} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.telephone && errors.telephone} />
        <Form.Control.Feedback type="invalid"> {errors.telephone} </Form.Control.Feedback>
      </Form.Group>  */}
    </>
  )
}

export default ContactDetails