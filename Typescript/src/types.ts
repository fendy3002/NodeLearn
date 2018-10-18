export interface Service1{
    (): Promise<Service2>
}
export interface Service2{
    (param1: number): Promise<Service3>
}
export interface Service3{
    svcName
}