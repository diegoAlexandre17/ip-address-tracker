import React, { useEffect, useState } from "react";
import { Button, Input, InputGroup, Tooltip } from "reactstrap";
import iconArrow from "../../public/icon-arrow.svg";
import IpInfo from "./IpInfo";
import IPAPI from "../api/API";
import { useMutation } from "react-query";
import Map from "./Map";
import SpinnerLoader from "./SpinnerLoader";

const Header = () => {
  const APIAxios = new IPAPI();

  const [ipInput, setIpInput] = useState("");
  const [ipData, setIpData] = useState(null);
  const [location, setLocation] = useState("");
  const [mapLeaving, setMapLeaving] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

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

  const handleClear = () => {
    setMapLeaving(true);
    setTimeout(() => {
      setIpInput("");
      setLocation(null);
      setIpData(null);
      setMapLeaving(false);
    }, 400);
  };

  return (
    <>
      <div className={`header-bg-img py-5 d-flex flex-column align-items-center ${!ipData ? 'header-full-height' : ''}`}>
        <div className="w-50">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <h1 className="text-white text-center mb-0">IP Address Tracker</h1>
            <span id="helpIcon" className="help-icon">?</span>
            <Tooltip
              target="helpIcon"
              placement="right"
              isOpen={tooltipOpen}
              toggle={() => setTooltipOpen(!tooltipOpen)}
            >
              <div className="help-tooltip text-start">
                <p>Ingresa una dirección IP para ver su ubicación en el mapa, zona horaria e ISP.</p>
                <p>Ejemplo: <strong>103.122.244.255</strong></p>
              </div>
            </Tooltip>
          </div>
          <form onSubmit={handleSearchIp}>
            <InputGroup className="d-flex justify-content-center">
              <Input
                className="search-btn p-2"
                name="ip_adress"
                placeholder="123.456.789.00"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
              />
              <Button
                className="bg-very-dark-gray"
                type="submit"
                disabled={isLoading || !ipInput}
              >
                <img src={iconArrow} alt="Icono" className="py-1" />
              </Button>
              {location && (
                <Button
                  className="bg-very-dark-gray"
                  type="button"
                  onClick={handleClear}
                  title="Limpiar"
                >
                  ✕
                </Button>
              )}
            </InputGroup>
          </form>
        </div>
      </div>

      {ipData && <IpInfo ipInfo={ipData} />}
      {location ? (
        <div className={mapLeaving ? "map-exit" : "map-enter"}>
          <Map location={location} />
        </div>
      ) : isLoading ? <SpinnerLoader/> : null}
    </>
  );
};

export default Header;
