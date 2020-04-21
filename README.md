# fgcc-app

A JavaScript / HTML application that measures Fractional Green Canopy Cover (FGCC)

## fgcc.js

A JavaScript class that computes FGCC

Example usage:

```javascript
var input = document.querySelector("#input canvas");
var output = document.querySelector("#output canvas");

var classifier = new FGCC(input, output);
classifier.p1 = 0.95;
classifier.p2 = 0.95;
classifier.p3 = 20;
classifier.noise = 100;

var fgcc = classifier.classify();

console.log(`FGCC is ${(fgcc * 100).toFixed(2)}%`);
```

## index.html

An HTML application that computes FGCC for images and videos (live and prerecorded)

### Files

* Drop image or video files in the drop zone
* Click "Copy Results" to copy the results to your clipboard (paste into Excel)

### Camera

* Click either video (Original or Classified) to pause
* Click either video again to un-pause

### Settings

* Modify settings used by the FGCC classifier
* Does not impact images / videos that have already been processed
* For more information, see references

## References

Patrignani, A. and Ochsner, T.E. (2015), [Canopeo: A Powerful New Tool for Measuring Fractional Green Canopy Cover](https://acsess.onlinelibrary.wiley.com/doi/abs/10.2134/agronj15.0150). Agronomy Journal, 107: 2312-2320. doi:10.2134/agronj15.0150
