import axios, {AxiosError, AxiosResponse, isAxiosError} from "axios";

type ResponseUsers = {
    users: User[]
    total: number
    skip: number
    limit: number
}

async function getDataUsers() {
    try {
        const response = await axios.get<ResponseUsers>('https://dummyjson.com/users');
        console.log(response.statusText)
    } catch (e: unknown) {
        if (isAxiosError(e)) {
            console.log((e.response?.data));
            return;
        }
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

getDataUsers()

enum HairColor {
    black = 'black',
    blond = 'blond',

}

enum Gender {
    Male = 'male',
    Female = 'female'
}

enum BloodGroup {
    APlus = 'A+',
    OMinus = 'O-',
    ABMinus = 'AB-',
    BMinus = 'B-'
}

enum CryptoCoin {
    Bitcoin = 'Bitcoin',
    Ethereum = 'Ethereum'
}

type Address = {
    address: string

    city: string
    coordinates: {
        lat: number

        lng: number
    }
    postalCode: string

    state: string
}

interface IHair {
    color: HairColor;
    type: string;
}

type User = {
    hair: IHair

    id: number
    firstName: string

    lastName: string

    maidenName: string

    age: number
    gender: Gender
    email: string

    phone: string

    username: string
    password: string

    birthDate: string

    image: string

    bloodGroup: BloodGroup

    height: number

    weight: number

    eyeColor: string


    domain: string

    ip: string

    address: Address
    macAddress: string

    university: string

    bank: {
        cardExpire: string

        cardNumber: string

        cardType: string

        currency: string

        iban: string

    }

    company: {
        address: Address

        department: string

        name: string

        title: string

    }
    ein: string
    ssn: string
    userAgent: string

    crypto: {
        coin: CryptoCoin

        wallet: string

        network: string
    }

}