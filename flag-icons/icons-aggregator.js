
const fs = require("fs/promises");
const babel = require('@babel/core');
const { minify } = require('terser');

const components = [
  {
    name: "CountryIcon",
    dictionary: {
      AX: "AlandIslandsIcon",
      AF: "AfghanistanIcon",
      AL: "AlbaniaIcon",
      DZ: "AlgeriaIcon",
      AS: "AmericanSamoaIcon",
      AO: "AngolaIcon",
      AD: "AndorraIcon",
      AI: "AnguillaIcon",
      AG: "AntiguaAndBarbudaIcon",
      AR: "ArgentinaIcon",
      AM: "ArmeniaIcon",
      AU: "AustraliaIcon",
      AW: "ArubaIcon",
      AT: "AustriaIcon",
      AZ: "AzerbaijanIcon",
      BH: "BahrainIcon",
      BS: "BahamasIcon",
      BD: "BangladeshIcon",
      BB: "BarbadosIcon",
      BY: "BelarusIcon",
      BE: "BelgiumIcon",
      BZ: "BelizeIcon",
      BJ: "BeninIcon",
      BT: "BhutanIcon",
      BM: "BermudaIcon",
      BA: "BosniaAndHerzegovinaIcon",
      BO: "BoliviaIcon",
      BW: "BotswanaIcon",
      BR: "BrazilIcon",
      IO: "BritishIndianOceanTerritoryIcon",
      BN: "BruneiIcon",
      VG: "BritishVirginIslandsIcon",
      BG: "BulgariaIcon",
      BF: "BurkinaFasoIcon",
      BI: "BurundiIcon",
      CA: "CanadaIcon",
      CM: "CameroonIcon",
      KH: "CambodiaIcon",
      KY: "CaymanIslandsIcon",
      CV: "CapeVerdeIcon",
      CF: "CentralAfricanRepublicIcon",
      TD: "ChadIcon",
      CL: "ChileIcon",
      CN: "ChinaIcon",
      CC: "CocosIslandIcon",
      CO: "ColombiaIcon",
      KM: "ComorosIcon",
      CK: "CookIslandsIcon",
      CR: "CostaRicaIcon",
      HR: "CroatiaIcon",
      CU: "CubaIcon",
      CW: "CuracaoIcon",
      CY: "CyprusIcon",
      CZ: "CzechRepublicIcon",
      CD: "DemocraticRepublicOfCongoIcon",
      DK: "DenmarkIcon",
      DJ: "DjiboutiIcon",
      DM: "DominicaIcon",
      DO: "DominicanRepublicIcon",
      EC: "EcuadorIcon",
      TL: "EastTimorIcon",
      EG: "EgyptIcon",
      SV: "ElSalvadorIcon",
      GQ: "EquatorialGuineaIcon",
      EE: "EstoniaIcon",
      ET: "EthiopiaIcon",
      ER: "EritreaIcon",
      FK: "FalklandIslandsIcon",
      FO: "FaroeIslandsIcon",
      FJ: "FijiIcon",
      FI: "FinlandIcon",
      PF: "FrenchPolynesiaIcon",
      FR: "FranceIcon",
      GA: "GabonIcon",
      GM: "GambiaIcon",
      GE: "GeorgiaIcon",
      DE: "GermanyIcon",
      GH: "GhanaIcon",
      GI: "GibraltarIcon",
      GR: "GreeceIcon",
      GL: "GreenlandIcon",
      GD: "GrenadaIcon",
      GU: "GuamIcon",
      GT: "GuatemalaIcon",
      GG: "GuernseyIcon",
      GW: "GuineaBissauIcon",
      GN: "GuineaIcon",
      GY: "GuyanaIcon",
      HT: "HaitiIcon",
      HN: "HondurasIcon",
      HK: "HongKongIcon",
      HU: "HungaryIcon",
      IN: "IndiaIcon",
      IS: "IcelandIcon",
      ID: "IndonesiaIcon",
      IR: "IranIcon",
      IE: "IrelandIcon",
      IQ: "IraqIcon",
      IM: "IsleOfManIcon",
      IT: "ItalyIcon",
      IL: "IsraelIcon",
      CI: "IvoryCoastIcon",
      JM: "JamaicaIcon",
      JP: "JapanIcon",
      JO: "JordanIcon",
      JE: "JerseyIcon",
      KZ: "KazakhstanIcon",
      KE: "KenyaIcon",
      KI: "KiribatiIcon",
      KW: "KuwaitIcon",
      LB: "LebanonIcon",
      KG: "KyrgyzstanIcon",
      LA: "LaosIcon",
      LS: "LesothoIcon",
      LV: "LatviaIcon",
      LI: "LiechtensteinIcon",
      LY: "LibyaIcon",
      LR: "LiberiaIcon",
      LU: "LuxembourgIcon",
      LT: "LithuaniaIcon",
      MO: "MacaoIcon",
      MG: "MadagascarIcon",
      MW: "MalawiIcon",
      MY: "MalaysiaIcon",
      ML: "MaliIcon",
      MV: "MaldivesIcon",
      MT: "MaltaIcon",
      MH: "MarshallIslandIcon",
      MQ: "MartiniqueIcon",
      MR: "MauritaniaIcon",
      MU: "MauritiusIcon",
      MX: "MexicoIcon",
      FM: "MicronesiaIcon",
      MD: "MoldovaIcon",
      MC: "MonacoIcon",
      MN: "MongoliaIcon",
      ME: "MontenegroIcon",
      MS: "MontserratIcon",
      MA: "MoroccoIcon",
      MZ: "MozambiqueIcon",
      NA: "NamibiaIcon",
      MM: "MyanmarIcon",
      NL: "NetherlandsIcon",
      NP: "NepalIcon",
      NR: "NauruIcon",
      NZ: "NewZealandIcon",
      NI: "NicaraguaIcon",
      NE: "NigerIcon",
      NU: "NiueIcon",
      NF: "NorfolkIslandIcon",
      NG: "NigeriaIcon",
      CY: "NorthernCyprusIcon",
      KP: "NorthKoreaIcon",
      NO: "NorwayIcon",
      OM: "OmanIcon",
      MP: "NorthernMarianasIslandsIcon",
      PS: "PalestineIcon",
      PK: "PakistanIcon",
      PW: "PalauIcon",
      PA: "PanamaIcon",
      PG: "PapuaNewGuineaIcon",
      PY: "ParaguayIcon",
      PE: "PeruIcon",
      PH: "PhilippinesIcon",
      PN: "PitcairnIslandsIcon",
      PL: "PolandIcon",
      PT: "PortugalIcon",
      PR: "PuertoRicoIcon",
      QA: "QatarIcon",
      MK: "RepublicOfMacedoniaIcon",
      CG: "RepublicOfTheCongoIcon",
      RO: "RomaniaIcon",
      RU: "RussiaIcon",
      RW: "RwandaIcon",
      EH: "SahrawiArabDemocraticRepublicIcon",
      WS: "SamoaIcon",
      SM: "SanMarinoIcon",
      ST: "SaoTomeAndPrinceIcon",
      SA: "SaudiArabiaIcon",
      SN: "SenegalIcon",
      RS: "SerbiaIcon",
      SC: "SeychellesIcon",
      SG: "SingaporeIcon",
      SL: "SierraLeoneIcon",
      SK: "SlovakiaIcon",
      SI: "SloveniaIcon",
      SB: "SolomonIslandsIcon",
      SO: "SomaliaIcon",
      KR: "SouthKoreaIcon",
      ZA: "SouthAfricaIcon",
      SS: "SouthSudanIcon",
      ES: "SpainIcon",
      LK: "SriLankaIcon",
      BL: "StBartsIcon",
      LC: "StLuciaIcon",
      VC: "StVincentAndTheGrenadinesIcon",
      SD: "SudanIcon",
      SR: "SurinameIcon",
      SZ: "SwazilandIcon",
      SE: "SwedenIcon",
      CH: "SwitzerlandIcon",
      SY: "SyriaIcon",
      TW: "TaiwanIcon",
      TJ: "TajikistanIcon",
      TZ: "TanzaniaIcon",
      TH: "ThailandIcon",
      TG: "TogoIcon",
      TO: "TongaIcon",
      TK: "TokelauIcon",
      TT: "TrinidadAndTobagoIcon",
      TN: "TunisiaIcon",
      TR: "TurkeyIcon",
      TM: "TurkmenistanIcon",
      TV: "TuvaluIcon",
      UG: "UgandaIcon",
      UA: "UkraineIcon",
      AE: "UnitedArabEmiratesIcon",
      GB: "UnitedKingdomIcon",
      US: "UnitedStatesIcon",
      UY: "UruguayIcon",
      UZ: "UzbekistánIcon",
      VU: "VanuatuIcon",
      VA: "VaticanCityIcon",
      VE: "VenezuelaIcon",
      VN: "VietnamIcon",
      VG: "VirginIslandsIcon",
      YE: "YemenIcon",
      ZW: "ZimbabweIcon",
      ZM: "ZambiaIcon",
      OT: "UnitedKingdomIcon",
      KN: "SaintKittsAndNevisIcon",
      XK: "KosovoIcon"
    }
  },
  {
    name: "CurrencyIcon",
    dictionary: {}
  }
];

function onlyUnique(value, index, self) { return self.indexOf(value) === index; }

const generateComponentJsx = (componentName, nameToTagsMap) => {
  return `
  import React from 'react';
  ${Object.entries(nameToTagsMap)
          .map(entry => entry[1])
          .filter(onlyUnique)
          .reduce(
            (prev, TagName) => {
              return (
                `${prev} 
                import ${TagName} from "./${TagName}";`
              );
            },
            "")}
  import EmptyIcon from "./EmptyIcon";
  
  const ${componentName} = (props) => {
    ${Object.entries(nameToTagsMap).reduce(
      (prev, [name, TagName]) => {
        return (
          `${prev} 
           if(props.name === "${name}") { return <${TagName} {...props} />; } `
        );
      },
      ""
    )}
    
    return <EmptyIcon {...props} />;
  };
  
  export default ${componentName};
  `;
};

async function generateRawReactCode(jsxCode) {
  const { code } = await babel.transformAsync(jsxCode, {
    presets: [['@babel/preset-react', { useBuiltIns: true }]],
  });
  const { code: minifiedCode } = await minify(code);

  return minifiedCode;
}

async function ouputRawReactFile(componentName, code, ouputDir) {
  await fs.writeFile(`${ouputDir}/${componentName}.js`, code, { encoding: "utf8", flag: "w" });
  await fs.writeFile(`${ouputDir}/${componentName}.d.ts`, `import * as React from 'react'; 
declare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;
export default ${componentName};`, 
  { encoding: "utf8", flag: "w" });
}

async function generateIconAggregators(ouputDir) {
  for(let i = 0; i < components.length; i++) {
    const { name: componentName, dictionary } = components[i];

    const jsxCode = await generateComponentJsx(componentName, dictionary);
    const rawReactCode = await generateRawReactCode(jsxCode);
    await ouputRawReactFile(componentName, rawReactCode, ouputDir);
  }

  return components.map(i => i.name);
}

module.exports = generateIconAggregators;

/**
 * TODO:
 * - add currency-flag mapping
 * - test on MAC
 * - write how when importing icons from figma, is important that components in figma are named in a certain way+
 * - maybe some steps in the readme (how to add new icons, how to add icons from other source than figma)
 */
