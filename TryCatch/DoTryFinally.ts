export default async() => {
    try{
        console.log("Executing error");
        throw new Error("Error executed");
    }
    finally {
        console.log("Finally executed");
    }
}