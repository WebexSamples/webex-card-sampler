// card_size.js
//
// An object for calculating the total size of an adaptive card
/*jshint esversion: 6 */  // Help out our linter

const when = require('when');
const request = require('request-promise');
const traverse = require('traverse');


class CardSize {
  /**
   * Size Object
   * 
   * Returned by the caculateRoughCardSize method
   *
   * @instance
   * @namespace size
   * @property {int} jsonSize - Size of the card JSON in bytes.
   * @property {object} images - An arry of objects that include the image's url and size
   * @property {object} imageErrors - An arry of objects that include the url of images which could not be fetched
   * @property {int} totalSize - Sum of the JSON and image size
   */

  /**
   * calculate the size of a card object along with the 
   * size of any downloaded images
   *
   * @function calculateRoughCardSize
   * @param {object} card - the Adaptive Card object to calculate
   * @return {Promise.<size>} - object with details about the size of the card
   */
  async calculateRoughCardSize(card) {
    if ((card === null) || (typeof card !== 'object') || 
      (card.type.toLowerCase() != "adaptivecard") ||
      (card.body === null) || (typeof card.body != 'object') ||
      (!card.body.length)) {
      return when.reject(new Error(`CardSize.calculate(): invalid card type`));
    }

    let size = {
      jsonSize: JSON.stringify(card).length,
      images: [],
      imageErrors: []
    };
    size.total = size.jsonSize;
    let imageSizePromises = [];

    traverse(card.body).map((x) => {
      if ((typeof x === 'object') && ('type' in x) &&
        ((x.type.toLowerCase() === 'image') ||
        (x.type.toLowerCase() === 'backgroundimage'))) {
        console.log(x.url);
        imageSizePromises.push(request.head(x.url).then((res) => {
          if (res['content-length'] !== undefined) {
            let imgSize = parseInt(res['content-length']);
            size.images.push({url: x.url, size: imgSize});
            size.total += imgSize;
          } else {
            throw new Error(`Could not determine size for ${x.url}`);
          }
        }).catch((e) => {
          size.imageErrors.push({url: x.url, error: e.message});
        })); 
      }
      // console.error(x);
      // console.error(typeof x);
      // if (typeof x === 'string') {
      //   console.log(this.node);
      // if ((this.node.toLowerCase() === "url") && 
      // ((this.parent.toLowerCase() === 'image') || (this.parent.toLowerCase() === 'backgroundimage'))) {
      // //Fetch Image size with request
      //   requestOpts.url = x;d;
      //   imagesizePromises.push(request(requestOpts));
      // }
      //}
    }, size, imageSizePromises);
    // .then(() => when.all(imageSizePromises))
    //   .then(() => when(size));
    return when.all(imageSizePromises).then(() => {
      return when(size);
    });

  }
}

module.exports = CardSize;

// Test Module In Place
/*
let cardSize = new CardSize();
let card = require('./res/design/agenda.json');
cardSize.calculateRoughCardSize(card).then((sizeInfo) => {
  console.log(sizeInfo);
}).catch((e) => {
  console.error(`lookup failed: ${e.message}`);
}); 
*/


