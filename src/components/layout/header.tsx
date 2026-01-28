"use client";

import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAttachMoney, MdOutlineTranslate } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "../features/search/SearchBox";
import { SearchProvider } from "@/contexts/SearchContext";

export default function Header() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
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
    <SearchProvider>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full"
      >
        {/* Top bar */}
        <div className="bg-[#f9f9f9] flex justify-between items-center px-3 md:px-6 py-2 gap-2 md:gap-3">
          <div className="hidden lg:flex items-center gap-2 flex-1">
            <FaPhoneAlt className="text-black/60 w-4 h-4" />
            <p className="text-sm text-black/60">
              <span className="font-semibold">Need help? call us:</span>{" "}
              <span className="text-black/40">+970 59-244-9634</span>
            </p>
          </div>

          <p className="text-sm md:text-base font-semibold text-black/60 text-center flex-1 lg:flex-1 truncate">
            Announcements Bar
          </p>

          <div className="flex items-center gap-1.5 md:gap-2 justify-end flex-1">
            {/* Currency Dropdown */}
            <div className="relative" ref={currencyRef}>
              <div
                onClick={handleCurrencyToggle}
                className="bg-white flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
              >
                <MdOutlineAttachMoney className="w-3 h-3 md:w-4 md:h-4 text-black/60" />
                <span className="text-xs md:text-sm font-semibold text-black/60 hidden sm:inline">
                  {selectedCurrency}
                </span>
                <FaChevronDown
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 text-black/40 transition-transform ${currencyOpen ? "rotate-180" : ""}`}
                />
              </div>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-25 z-50"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <div
                onClick={handleLanguageToggle}
                className="bg-white flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
              >
                <MdOutlineTranslate className="w-3 h-3 md:w-4 md:h-4 text-black/60" />
                <span className="text-xs md:text-sm font-semibold text-black/60 hidden sm:inline">
                  {selectedLanguage}
                </span>
                <FaChevronDown
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 text-black/40 transition-transform ${languageOpen ? "rotate-180" : ""}`}
                />
              </div>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-30 z-50"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-white border-b border-black/10 flex items-center justify-between gap-2 md:gap-4 lg:gap-6 px-3 md:px-6 py-2 rounded-bl-3xl rounded-br-3xl">
          {/* Mobile Search Mode */}
          {mobileSearchActive ? (
            <div className="flex items-center gap-2 w-full md:hidden">
              <button
                onClick={() => setMobileSearchActive(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <HiX className="w-5 h-5 text-black/60" />
              </button>
              <div className="flex-1">
                <SearchBox />
              </div>
            </div>
          ) : (
            <>
              {/* Logo */}
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="CureWay Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-base md:text-xl font-black text-black leading-none">
                  CUREWAY
                </p>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1">
                <SearchBox />
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                {/* Mobile Search Icon */}
                <button
                  onClick={() => setMobileSearchActive(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Open search"
                >
                  <IoSearchOutline className="w-5 h-5 text-black/60" />
                </button>
                {/* Mobile menu button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiX className="w-6 h-6 text-black/60" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiMenu className="w-6 h-6 text-black/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="hidden md:flex bg-[#f4f4f4] items-center gap-2 h-11 px-2 rounded-lg w-40 lg:w-45">
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
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-black/10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
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
            </>
          )}
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-b border-black/10 overflow-hidden"
            >
              <div className="px-3 py-4 space-y-4">
                {/* Mobile location */}
                <div className="bg-[#f4f4f4] flex items-center gap-2 h-11 px-2 rounded-lg">
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

                {/* Mobile help */}
                <div className="flex items-center gap-2 px-2">
                  <FaPhoneAlt className="text-black/60 w-4 h-4" />
                  <p className="text-sm text-black/60">
                    <span className="font-semibold">Need help? call us:</span>{" "}
                    <span className="text-black/40">+970 59-244-9634</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </SearchProvider>
  );
}
