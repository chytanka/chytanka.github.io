export interface GamepadButtonState {
    pressed: boolean;
    value: number;
    touched: boolean;
}

export interface GamepadState {
    id: string;
    index: number;
    buttons: GamepadButtonState[];
    axes: number[];
}

export enum GamepadButton {
    A = 0, Cross = 0,
    B = 1, Circle = 1,
    X = 2, Square = 2,
    Y = 3, Triangle = 3,
    LB = 4, L1 = 4,
    RB = 5, R1 = 5,
    LT = 6, L2 = 6,
    RT = 7, R2 = 7,
    Back = 8, Share = 8,
    Start = 9, Options = 9,
    LS = 10, L3 = 10,
    RS = 11, R3 = 11,
    DPadUp = 12,
    DPadDown = 13,
    DPadLeft = 14,
    DPadRight = 15,
    Home = 16, PS = 16
}

export enum ControllerType {
    Unknown = 'Unknown',
    Xbox = 'Xbox',
    PlayStation = 'PlayStation'
}

export enum AnalogStick {
    Left = 'Left',
    Right = 'Right'
}