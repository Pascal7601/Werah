import React, { useState } from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import JobsSection from "../components/JobsSection";
import { useDebounce } from "use-debounce";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  return (
    <div>
      <NavBar />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <JobsSection searchTerm={debouncedSearchTerm} />
    </div>
  );
}

export default Home;
