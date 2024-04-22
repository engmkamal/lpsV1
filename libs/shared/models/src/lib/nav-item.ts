export interface NavItem {
    Id?:number;
    Name?:string;
    MenuName?:string;
    IsInCorporate?: boolean;
    IsIndividual?: boolean;
    MenuIcon?:string;
    Routing?:string;
    IsActive?: boolean;
    Order?:number;
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    ParentMenuId?: number;
    children?: NavItem[] | undefined;
    
}

