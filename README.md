# Onramper flag icons
This a package for exporting SVG files as React components. 
The SVG files were imported using Figma API.

## Importing icons from Figma
1. Make sure to add your own .env file containing your figma details:
```
FIGMA_TOKEN=$YOUR_TOKEN
FILE_ID=$YOUR_FILE_ID
```

Follow [these instructions](https://www.figma.com/developers/api#authentication) to get or create your Figma access token.  
The file id can be easily retrieved by accessing your figma file on your browser where you have to extract the value from the URL: 
https://www.figma.com/file/`${YOUR_FILE_ID}`/my_figma_file_name 
    
2. Create a page inside your figma file called 'flags', and add your icons (should be grouped into components)

3. Run export
```shell
$ num run export
```
The icons added to the 'flag' page will get exported as SVG under a folder with the same name. 

## Build
```shell
npm run build
```
The build script will export the SVG files from multiple locations (specified in the code as input). The result will be React components for each of the files found.

## Aggregators
During the build process, some additional components are constructed to render a specific icon based on a given name, which can be country code or currency ID. 
For example, the following component should render the flag of United Kindom: 
````javascript
<CountryIcon name="UK" />
````

 These aggregator components are built using the `icons-aggregator.js` script. 
 The following input is received by the algorithm:
````javascript
const components = [
    {
      name: "CountryIcon",
      dictionary: {
        AX: "AlandIslandsIcon",
        AF: "AfghanistanIcon",
        [...]
      }
    },
    {
      name: "CurrencyIcon",
      dictionary: {
        AUD: "AustraliaIcon",
        GBP: "UnitedKingdomIcon",
        [...]
      }
    }
  ];
````
