let qsoCounter = 0;
const bigSectors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
const smallSquares = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

const parser = (logObj) => {
    if (logObj.systemType == 'userRecords' && logObj.gridsquare !== undefined) {
    
        const bigSectorFirst = logObj.gridsquare.charAt(0);
        const bigSectorSecond = logObj.gridsquare.charAt(1);
        const bigSquareFirst = logObj.gridsquare.charAt(2);
        const bigSquareSecond = logObj.gridsquare.charAt(3);
        const smallSquareFirst = logObj.gridsquare.charAt(4);
        const smallSquareSecond = logObj.gridsquare.charAt(5);


        const locator = {
            bigSectorFirst: false,
            bigSectorSecond: false,
            bigSquareFirst: false,
            bigSquareSecond: false,
            smallSquareFirst: false,
            smallSquareSecond: false,
            permissibleSectors: false,
            permissibleBigSq: false,
            permissibleSmallSq: false,
        }

        if (logObj.gridsquare.length >= 2) {
            for (let i = 0; i < bigSectors.length; i++) {
                if (bigSectorFirst == bigSectors[i]) {
                    locator.bigSectorFirst = true;
                }
            }

            for (let i = 0; i < bigSectors.length; i++) {
                if (bigSectorSecond == bigSectors[i]) {
                    locator.bigSectorSecond = true;
                }
            }
        }

        if (logObj.gridsquare.length >= 4) {

            //Большие квадраты
            for (let i = 0; i <= 9; i++) {

                if (bigSquareFirst == i) {
                    locator.bigSquareFirst = true;
                }
            }

            for (let i = 0; i <= 9; i++) {
                if (bigSquareSecond == i) {
                    locator.bigSquareSecond = true;
                }
            }
        }


        if (logObj.gridsquare.length == 6) {
            for (let i = 0; i <= smallSquares.length; i++) {
                if (smallSquareFirst == smallSquares[i]) {
                    locator.smallSquareFirst = true;
                }
            }

            for (let i = 0; i <= smallSquares.length; i++) {
                if (smallSquareSecond == smallSquares[i]) {
                    locator.smallSquareSecond = true;
                }
            }
        }

        // Проверяем сектора
        if (locator.bigSectorFirst && locator.bigSectorSecond) {
            locator.permissibleSectors = true;
        }
        // Проверяем большие квадраты
        if (locator.bigSquareFirst && locator.bigSquareSecond) {
            locator.permissibleBigSq = true;
        }
        // Квадрат на малые 
        if (locator.smallSquareFirst && locator.smallSquareSecond) {
            locator.permissibleSmallSq = true;
        }

        if(locator.permissibleSectors || locator.permissibleBigSq || locator.permissibleSmallSq) {

            return {
                ...logObj,
                gridsquare: `${bigSectorFirst}${bigSectorSecond}${bigSquareFirst}${bigSquareSecond}${smallSquareFirst}${smallSquareSecond}`
            }
        }
    } else {
        return null
    }
}

module.exports.bigSectors = bigSectors;
module.exports.parser = parser;