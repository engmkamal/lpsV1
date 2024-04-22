export const apis: IApis = {
    "development":{
        "leftNavItems":"https://localhost:7095/api/LeftNavigation/GetData",
        "allFormField": "https://localhost:7095/api/Schema/GetAll",
        "schemas": "https://localhost:7095/api/Schema/GetAll",
        "templetMaster": "https://localhost:7095/api/Template/GetAll",
        "templetDetails": "https://localhost:7095/api/Schema/GetAll" 
    },
    "production":{
        "leftNavItems":"https://localhost:7095/api/LeftNavigation/GetData",
        "allFormField": "https://www.basicbanklimited.com/lps/api/Schema/GetAll",
        "schemas": "https://www.basicbanklimited.com/lps/api/Schema/GetAll",
        "templetMaster": "https://localhost:7095/api/Template/GetAll",
        "templetDetails": "https://www.basicbanklimited.com/lps/api/Schema/GetAll" 
    }
}

interface IEnv {
    leftNavItems?: string;
    allFormField?: string; 
    schemas?: string;
    templetMaster?: string;
    templetDetails?: string;
}

interface IApis {
    development: IEnv;
    production: IEnv;
}
