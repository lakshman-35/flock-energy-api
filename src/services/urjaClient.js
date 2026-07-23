const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");

const config = require("../config/config");

class UrjaClient {

    constructor() {

        this.jar = new CookieJar();

        this.client = wrapper(
            axios.create({
                baseURL: config.baseURL,
                jar: this.jar,
                withCredentials: true,
                validateStatus: () => true
            })
        );

        this.loggedIn = false;
    }

    async login() {

        if (this.loggedIn) return;

        const params = new URLSearchParams();
        params.append("email", config.email);
        params.append("password", config.password);

        const response = await this.client.post(
            "/login",
            params.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                    "Origin": config.baseURL,
                    "Referer": `${config.baseURL}/login`,
                    "x-sveltekit-action": "true"
                },
                validateStatus: () => true
            }
        );

        if (response.status >= 400) {
            throw new Error("Login failed. Please check your credentials.");
        }

        this.loggedIn = true;
    }

    async getMeters(page = 1, q = "") {

        await this.login();

        const response = await this.client.get(
            "/portal/meters/search",
            {
                params: {
                    q,
                    page
                }
            }
        );

        if (response.status >= 400) {
            throw new Error("Failed to fetch meters.");
        }

        return response.data;
    }

    async getGeo(meterId) {

        await this.login();

        const response = await this.client.get(
            `/portal/meters/${meterId}/geo`
        );

        if (response.status >= 400) {
            throw new Error(`Failed to fetch location for meter ${meterId}.`);
        }

        return response.data;
    }

    async getEnergy(meterId) {

        await this.login();

        const response = await this.client.get(
            `/portal/meters/${meterId}/energy`
        );

        if (response.status >= 400) {
            throw new Error(`Failed to fetch energy data for meter ${meterId}.`);
        }

        return response.data;
    }

    async getMeterById(meterId) {

        const meters = await this.getMeters();

        const meter = meters.data.find(
            m => m.meterId === meterId
        );

        if (!meter) {
            throw new Error("Meter not found.");
        }

        const geo = await this.getGeo(meterId);

        return {
            ...meter,
            location: geo.data
        };
    }

    async getConsumption(meterId) {

        const energy = await this.getEnergy(meterId);

        return energy.data.map(item => ({
            timestamp: item.timestamp,
            kwh: Number(item.kwh),
            kvah: Number(item.kvah),
            voltR: Number(item.voltR)
        }));
    }

}

module.exports = new UrjaClient();