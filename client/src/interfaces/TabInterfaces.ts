/**
 * Tab Interface
 */
export interface TabInterface {
    icon:JSX.Element;
    label: string;
}
/**
 * Tab Panel Interface
 */
export interface TabPanelInterface {
    value: number;
    items: JSX.Element[];
}
