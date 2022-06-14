import logo from "../assets/blue-bishop.png"

export enum FigureColors {
    YELLOW = "yellow",
    GREEN = "green",
    RED = "red",
    BLUE = "blue",
}

export enum CellColors {
    BLACK = "black",
    WHITE = "white",
    INVISIBLE = "invisible"
}

export const mapColorToLogo = (color: FigureColors, logos: typeof logo[]) => {
    let map = new Map();
    map.set(FigureColors.YELLOW, logos[0]);
    map.set(FigureColors.GREEN, logos[1]);
    map.set(FigureColors.RED, logos[2]);
    map.set(FigureColors.BLUE, logos[3]);
    return map.get(color);
}

export const mapColorToDirection = (color: FigureColors) => {
    let map = new Map();
    map.set(FigureColors.YELLOW, [1, 0]);
    map.set(FigureColors.GREEN, [0, -1]);
    map.set(FigureColors.RED, [-1, 0]);
    map.set(FigureColors.BLUE, [0, 1]);
    return map.get(color);
}

export const mapColorToNumber = (color: FigureColors) => {
    let map = new Map();
    map.set(FigureColors.YELLOW, 0);
    map.set(FigureColors.GREEN, 1);
    map.set(FigureColors.RED, 2);
    map.set(FigureColors.BLUE, 3);
    return map.get(color);
}
