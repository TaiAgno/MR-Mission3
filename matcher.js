// prediction matcher

// object with 4 possible tags/properties to return to client side
var predictionDetails = {
    "sedan": {
        imageUrl: "cars/2014-toyota-sai-23625781_17426966.jpg",
        carTag: "Sedan - 2014 Toyota SAI",
        url: "https://www.turners.co.nz/Cars/Used-Cars-for-Sale/toyota/sai/23625781",
        comment: "Who is the one overpacking?"
    },
    "suv": {
        imageUrl: "cars/2019-nissan-qashqai-23924142_17584165.jpg",
        carTag: "SUV - 2019 Nissan Qashqai",
        url: "https://www.turners.co.nz/Cars/Used-Cars-for-Sale/nissan/qashqai/23924142",
        comment: "Family getting bigger?"
    },
    "hatchback": {
        imageUrl: "cars/2018-mazda-demio-23633232_17363625_gallery.jpg",
        carTag: "Hatchback - 2018 Mazda Demio",
        url: "https://www.turners.co.nz/Cars/Used-Cars-for-Sale/mazda/demio/23633232",
        comment: "Not great with parallel parking huh?"
    },
    "convertible": {
        imageUrl: "cars/2006-bmw-z4-24477841_17977993.jpg",
        carTag: "Convertible - 2006 BMW Z4",
        url: "https://www.turners.co.nz/Cars/Used-Cars-for-Sale/bmw/z4/24477841",
        comment: "Fancy-schmancy"
    }
};

// matches the uploaded image with the highest probability from the prediction AI
const NO_PREDICTIONS_FOUND = "No predictions found";
const NO_MATCH_FOUND = "No match found";
const NEGATIVE = "negative";

function matchImageWithPrediction(prediction) {
    if (!prediction.predictions || prediction.predictions.length === 0) {
        console.error(NO_PREDICTIONS_FOUND);
        return { error: NO_PREDICTIONS_FOUND, comment: "Sorry, no match found." };
    }

    // find the prediction with the highest probability
    const highestProbabilityPrediction = prediction.predictions.reduce((prev, current) => {
        return (prev.probability > current.probability) ? prev : current;
    });

    // check if the tagName is within predictionDetails
    const tagName = highestProbabilityPrediction.tagName.toLowerCase();
    if (tagName === NEGATIVE) {
        return { error: NO_MATCH_FOUND, comment: "Sorry, we do not sell that." };
    } 

    // return the information associated with the matched car type
    return {
        carType: tagName,
        imageUrl: predictionDetails[tagName].imageUrl,
        carTag: predictionDetails[tagName].carTag,
        url: predictionDetails[tagName].url,
        comment: predictionDetails[tagName].comment,
        probability: highestProbabilityPrediction.probability,
    };
}

module.exports = { matchImageWithPrediction };