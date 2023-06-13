import React, { useState } from "react";

const useTour = () => {
    const [ tourDoneOfPages, setTourDoneOfPages ] = useState(1);

    // use local storage to manage cart data
    const addTourToStorage = page => {
        let tourStorage = getTourStorage();
        // add isStored
        const isStored = tourStorage[page];
        if (!isStored) {
            tourStorage[page] = true;
        }
        sessionStorage.setItem('tour', JSON.stringify(tourStorage));
        return isStored;
    }

    const removeFromStorage = page => {
        const tourStorage = getTourStorage();
        if (page in tourStorage) {
            delete tourStorage[page];
            sessionStorage.setItem('tour', JSON.stringify(tourStorage));
        }
    }

    const checkInTourStorage = page => {
        let tourStorage = getTourStorage();
        const numProperties = Object.keys(tourStorage).length;
        setTourDoneOfPages(numProperties);
        const isStored = tourStorage[page];
        return isStored;
    }

    const getTourStorage = () => {
        let tourStorage = {};

        //get the shopping cart from local storage
        const storedTour = sessionStorage.getItem('tour');
        if (storedTour) {
            tourStorage = JSON.parse(storedTour);
        }
        return tourStorage;
    }

    const deleteShoppingCart = () => {
        sessionStorage.removeItem('tour');
    }

    return {
        tourDoneOfPages,
        checkInTourStorage,
        addTourToStorage,
        removeFromStorage,
        getTourStorage,
        deleteShoppingCart
    }
};

export default useTour;