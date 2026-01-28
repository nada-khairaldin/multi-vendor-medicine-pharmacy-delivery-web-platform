"use client";

import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { FiMapPin, FiMic } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAttachMoney, MdOutlineTranslate } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SearchBox from "../features/search/SearchBox";
import { SearchProvider } from "@/contexts/SearchContext";

export default function Header() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node) &&
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setCurrencyOpen(false);
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyToggle = () => {
    setCurrencyOpen(!currencyOpen);
    setLanguageOpen(false); // Close language dropdown when opening currency
  };

  const handleLanguageToggle = () => {
    setLanguageOpen(!languageOpen);
    setCurrencyOpen(false); // Close currency dropdown when opening language
  };

  return (
    <header className="bg-white w-full">
      {/* Top bar */}
      <div className="bg-[#f9f9f9] flex justify-between items-center px-6 py-2 gap-3">
        <div className="flex items-center gap-2 flex-1">
          <FaPhoneAlt className="text-black/60 w-4 h-4" />
          <p className="text-sm text-black/60">
            <span className="font-semibold">Need help? call us:</span>{" "}
            <span className="text-black/40">+970 59-244-9634</span>
          </p>
        </div>

        <p className="text-base font-semibold text-black/60 text-center flex-1">
          Announcements Bar
        </p>

        <div className="flex items-center gap-2 justify-end flex-1">
          {/* Currency Dropdown */}
          <div className="relative" ref={currencyRef}>
            <div
              onClick={handleCurrencyToggle}
              className="bg-white flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
            >
              <MdOutlineAttachMoney className="w-4 h-4 text-black/60" />
              <span className="text-sm font-semibold text-black/60">
                {selectedCurrency}
              </span>
              <FaChevronDown
                className={`w-3 h-3 text-black/40 transition-transform ${currencyOpen ? "rotate-180" : ""}`}
              />
            </div>
            {currencyOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] z-50">
                {["USD", "EUR", "ILS"].map((currency) => (
                  <div
                    key={currency}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyOpen(false);
                    }}
                    className={`px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedCurrency === currency
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "text-black/60"
                    }`}
                  >
                    {currency}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <div
              onClick={handleLanguageToggle}
              className="bg-white flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
            >
              <MdOutlineTranslate className="w-4 h-4 text-black/60" />
              <span className="text-sm font-semibold text-black/60">
                {selectedLanguage}
              </span>
              <FaChevronDown
                className={`w-3 h-3 text-black/40 transition-transform ${languageOpen ? "rotate-180" : ""}`}
              />
            </div>
            {languageOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-50">
                {[
                  { value: "English", label: "English" },
                  { value: "العربية", label: "العربية" },
                ].map((lang) => (
                  <div
                    key={lang.value}
                    onClick={() => {
                      setSelectedLanguage(lang.value);
                      setLanguageOpen(false);
                    }}
                    className={`px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedLanguage === lang.value
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "text-black/60"
                    }`}
                  >
                    {lang.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-black/10 flex items-center justify-between gap-6 px-6 py-2 rounded-bl-3xl rounded-br-3xl">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="CureWay Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-xl font-black text-black leading-none">CUREWAY</p>
        </div>

        <div className="flex-1">
          <SearchProvider>
            <SearchBox />
          </SearchProvider>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-[#f4f4f4] flex items-center gap-2 h-11 px-2 rounded-lg w-[180px]">
            <FiMapPin className="w-4 h-4 text-black/60 shrink-0" />
            <div className="flex-1 flex flex-col gap-1 justify-center">
              <p className="text-xs font-semibold text-black/50">
                Select Loaction
              </p>
              <div className="flex items-center gap-1">
                <p className="flex-1 text-xs text-black/80 truncate">
                  26 Salah El Din St...
                </p>
                <FaChevronDown className="w-2 h-2 text-black/60 rotate-90 shrink-0" />
              </div>
            </div>
          </div>
          <Link
            href="/auth/register"
            className="w-10 h-10 rounded-full overflow-hidden bg-black/10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
