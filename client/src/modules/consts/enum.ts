export enum Guardtypes {
    Private = 'private',
    Public = 'public',
    Auth = 'auth',
}

export enum RoutePaths {
    Login = '/login',
    SignUp = '/signup',
    LandingPage = '/',
    Dashboard = '/home',
    NotFound = '/*',
    PasswordGenerator = '/password-generator',
    ShowAllPasswords = '/all-passwords',
    HangMan = '/hangman',
    TicTacToe = '/tic-tac-toe',
    RockPaperScissor = '/rock-paper-scissor',
    
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
