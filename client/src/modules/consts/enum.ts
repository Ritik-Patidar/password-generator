export enum Guardtypes {
    Private = 'private',
    Public = 'public',
    Auth = 'auth',
}

export enum RoutePaths {
    Login = '/login',
    LandingPage = '/',
    Dashboard = '/home',
    NotFound = '/NotFound',
    
}

export enum AuthKeys {
    accessToken = 'accessToken',
    idToken = 'idToken',
    uDetails = 'uDetails',
}

export enum GuestStatus {
    needsAction = 'needsAction',
    tentative = 'tentative',
    accept = 'accepted',
    declined = 'declined',
}

export const slotOptions = Array(5).fill({ value: 'X', label: 'xx:xx - xx:xx' });
