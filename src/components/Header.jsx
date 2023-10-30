import React, { useEffect, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import iconArrow from "../../public/icon-arrow.svg";
import IpInfo from "./IpInfo";
import IPAPI from "../api/API";
import { useMutation } from "react-query";

const Header = () => {
  const APIAxios = new IPAPI();

  const [ipInput, setIpInput] = useState(null);
  const [ipData, setIpData] = useState(null);
  const dataIp = [
    {
      title: "IP ADDRESS",
      text: "192.212.174.101",
    },
    {
      title: "LOCATION",
      text: "Brooklyn, NY 10001",
    },
    {
      title: "TIMEZONE",
      text: "UTC-05:00",
    },
    {
      title: "ISP",
      text: "SPACE X STARLINK",
    },
  ];

  const { mutate: mutation, isLoading } = useMutation({
    mutationFn: (dataInput) => APIAxios.getIpData(dataInput),
    onSuccess: (data) => {
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

  const handleSearchIp = () => {
    return mutation(ipInput);
  };

  return (
    <>
      <div className="header-bg-img py-5 d-flex flex-column align-items-center justify-content-center">
        <div className="w-50 ">
          <h1 className="text-white text-center">IP Address Tracker</h1>

          <InputGroup>
            <Input
              type="search"
              onChange={(e) => {
                setIpInput(e.target.value);
              }}
            />
            <Button className="bg-very-dark-gray" onClick={handleSearchIp}>
              <img src={iconArrow} alt="Icono" className="py-1" />
            </Button>
          </InputGroup>
        </div>
      </div>

      {ipData && (
        <div className="d-flex justify-content-center bg-info mt-n5">
          <IpInfo ipInfo={ipData} />
        </div>
      )}
    </>
  );
};

export default Header;
