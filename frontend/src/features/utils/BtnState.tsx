import { useFormStatus } from "react-dom"


const Terms: Record<string, string> = {
    Login: "Validating user...",
    Register: "Creating user...",
}

const BtnState = (prop: { Props: { prop: string } }) => {
    const status = useFormStatus();
    const alt = Terms[prop.Props.prop] ?? prop.Props.prop;

    return (
        <button
            type="submit"
            className="bg-black text-white p-1 px-3 md:p-2 md:px-5 text-[20px] md:text-2xl hover:bg-white hover:text-black transtion duration-300 border-2 rounded-[5px] border-black"
        >
            {status.pending ? alt : prop.Props.prop}
        </button>
    );
}

export default BtnState