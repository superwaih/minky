
type IShowErrorModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ShowSuccessModal ={
    amountTokens: null | number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    url: string
}