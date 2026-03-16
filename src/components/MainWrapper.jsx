"use client";
import { useRef, useState, useEffect, useCallback } from "react";

import Places from "@/components/Places";
import { AVAILABLE_PLACES } from "@/app/api/mockData";
import { sortPlacesByDistance } from "@/lib/local";

function MainWrapper() {
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      //set const to change state
      setAvailablePlaces(sortedPlaces);
      //set localStorage picked places
      const storedIds = JSON.parse(localStorage.getItem("Selected Places")) || [];
      const locaStoredPlaces = storedIds.map((id) =>
      AVAILABLE_PLACES.find((place) => place.id === id)
    );
    setPickedPlaces(locaStoredPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    selectedPlace.current = id;
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("Selected Places")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "Selected Places",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    const storedIds = JSON.parse(localStorage.getItem("Selected Places")) || [];
    localStorage.setItem(
      "Selected Places",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  return (
    <>
      <main className="flex flex-col justify-center w-full max-w-7xl mx-auto text-white py-5 font-sans max-sm:px-8">
        <h1 className="text-5xl text-center mb-5">PlacePicker</h1>
        <p className="text-xl text-center">
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          handleStartDeletePlace={handleStartRemovePlace}
          isSelectedPlace={true}
          handleRemovePlace={handleRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance"
          onSelectPlace={handleSelectPlace}
          isSelectedPlace={false}
        />
      </main>
    </>
  );
}

export default MainWrapper;
