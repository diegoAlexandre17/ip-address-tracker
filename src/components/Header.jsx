import React, { useEffect, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import iconArrow from "../../public/icon-arrow.svg";
import IpInfo from "./IpInfo";
import IPAPI from "../api/API";
import { useMutation } from "react-query";
import Map from "./Map";
import SpinnerLoader from "./SpinnerLoader";

const Header = () => {
  const APIAxios = new IPAPI();

  const [ipInput, setIpInput] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [location, setLocation] = useState("");

  const { mutate: mutation, isLoading } = useMutation({
    mutationFn: (dataInput) => APIAxios.getIpData(dataInput),
    onSuccess: (data) => {
      setLocation({ lat: data.location.lat, lng: data.location.lng });
      setIpData([
        {
          title: "IP ADDRESS",
          text: data.ip,
        },
        {
          title: "LOCATION",
          text: `${data.location.city}, ${data.location.region}`,
        },
        {
          title: "TIMEZONE",
          text: data.location.timezone,
        },
        {
          title: "ISP",
          text: data.isp,
        },
      ]);
    },
  });

  const handleSearchIp = (e) => {
    e.preventDefault();
    if (ipInput) {
      mutation(ipInput);
    }
    setLocation(null)
    setIpData(null);
  };

  return (
    <>
      <div className="header-bg-img py-5 d-flex flex-column align-items-center ">
        <div className="w-50">
          <h1 className="text-white text-center">IP Address Tracker</h1>
          <form onSubmit={handleSearchIp}>
            <InputGroup className="d-flex justify-content-center">
              <Input
                className="search-btn p-2"
                name="ip_adress"
                type="search"
                placeholder="123.456.789.00"
                onChange={(e) => {
                  setIpInput(e.target.value);
                }}
              />
              <Button
                className="bg-very-dark-gray"
                type="submit"
                disabled={isLoading || !ipInput}
              >
                <img src={iconArrow} alt="Icono" className="py-1" />
              </Button>
            </InputGroup>
          </form>
        </div>
      </div>

      {ipData && <IpInfo ipInfo={ipData} />}
      {location ? <Map location={location} /> : isLoading ? <SpinnerLoader/> : null}
    </>
  );
};

export default Header;
