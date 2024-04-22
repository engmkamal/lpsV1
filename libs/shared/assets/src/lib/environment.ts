export const environment: IEnvironment = {
    "development":true,
    "production":false
}

interface IEnvironment {
    development: boolean;
    production: boolean;
}

/** do not use/remain/left any semicolone ',' after the last key:value pair */