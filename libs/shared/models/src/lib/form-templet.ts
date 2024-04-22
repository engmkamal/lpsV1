export class BaseEntity
{
    CreatedDate?: Date;
    UpdatedDate?: Date;
    CreatedBy?:string;
    UpdatedBy?:string;
    EncryptedId?:string;
    DateFormat?:string;
}

export interface ISchema {
    Name?: string;
    TypeId?: number;
    Reference?: string;
    Referenced?: string;
    Enum?: string;
    Required?: string;
    Pattern?: string;
    Format?: string;
    CustomDateFormat?: string;
    MultipleOf?: number;
    Maximum?: number;
    Minimum?: number;
    ExclusiveMaximum?: number;
    ExclusiveMinimum?: number;
    MaxLength?: number;
    MinLength?: number;
    MaxItems?: number;
    MinItems?: number;
    IsUniqueItems?:boolean;
    MaxProperties?: number;
    MinProperties?: number;
    PropertyNames?: string;
    Dependencies?: string;
    AdditionalProperties?: string;
    Title?: string;
    Description?: string;
    Examples?: string;
    Default?: string;
    ReadOnly?: string;
    CreateOnly?: boolean;
    Definitions?: string;
    Items?: string;
    Properties?: string;
    WidgetId?: number;
    WidgetType?: string;
    Style?: string;
    Class?: string;
    ChoicesUrl?: string;
    ChoicesVerb?: string;
    ChoicesUrlArgs?: string;
    ChoicesLoadId?: number;
    Choices?: string;
    DisplayWith?: string;
    DisplayWithChoices?: string;
    Jsonata?: string;
    LayoutId?: number;
    Order?: string;
    Switch?: string;
    Case?: string;
    Expanded?: boolean;
    HideUndefined?: boolean;
    Computed?: string;
    ErrorMessage?: string;
    SchemaDetails?: string;
    GroupTitle?: string;
    GroupCategory?: number;
    ChoicesLoad?: any;
    Layout?: any;
    Type?: any;
    Widget?: any;
}


export class ITemplateDetails
{
    Id?:number;
    TemplateMasterId?:number;
    Title?: string;
    IssueTypeId?:number;
    IssueStatusId?:number;
    IssuePriorityId?:number;
    ListPosition?:number;
    Description?: string;
    Estimate?:number;
    TimeSpent?:number;
    TimeRemaining?:number;
    ReporterId?: string;
    UserIds?: string;
    Comments?: string;
    ProjectId?: string;
    Control?: string;
    Name?: string;
    SchemaId?:number;
    Value?: string;
    GroupTitle?: string;
    IssuePriority?: any;
    IssueStatus?: any;
    IssueType?: any;
    Schema?: ISchema[];
    TemplateMaster?: any;
}


export interface ITemplateMaster extends BaseEntity{
    Id?:number;
    Name?: string;    
    Url?: string;
    Description?: string;    
    CategoryId?:number
    EffectiveFrom?: Date;
    EffectiveTo?: Date;
    Category?:any;
    TemplateDetails?:ITemplateDetails[];
}

// eslint-disable-next-line no-shadow
export enum ProjectCategory {
  SOFTWARE = 'Software',
  MARKETING = 'Marketing',
  BUSINESS = 'Business'
}