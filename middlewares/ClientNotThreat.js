//This middleware confirms that the request wasn't
//sent from a client that can implicate the administrators of the app(e.g. I.P of feds, tech giants, e.t.c)

/***************************************************************/
/*                 Threat Requirements                         */
/***************************************************************/
/* I.P address matches 1 blacklisted I.P Address               */
/* I.P address matches I.P address of 1 Law enforcement agency *************************************/
/* I.P address matches I.P address of 1 tech-giant company (e.g. facebook, google, twitter, e.t.c) */
/***************************************************************************************************/

///////////
//Threats//
///////////
const blacklisteds = [
    {
        id: 1,
        hostname: "",
        ip: "",
    }
];

const lawEnforcementAgencies = [
    {
        id: 1,
        hostname: "",
        ip: ""
    }
];

const techGiants = [
    {
        id: 1,
        hostname: "",
        ip: ""
    }
];

/**
 * 
 * @param {*} ip the I.P address of the client
 * @returns true if the I.P address poses threat and false if otherwise
 */
const ipIsThreat = (ip) => {
    let isThreat = false;


    for (let i = 0; i < blacklisteds.length; i++) {
        if (ip === blacklisteds[i].ip) {        // the hostname is blacklisted

            isThreat = true;

            throw {
                code: 11,
                msg: "The hostname is blacklisted"
            };
            break;
        }
    }

    if (!isThreat) {
        for (let n = 0; n < lawEnforcementAgencies.length; n++) {
            if (ip === lawEnforcementAgencies[n].ip) {

                isThreat = true;

                throw {
                    code: 12,
                    msg: "The hostname belongs to law enforcement agency"
                };
                break;
            }
        }
    }

    if (!isThreat) {
        for (let x = 0; x < techGiants; x++) {
            if (ip === techGiants[x].ip) {
                isThreat = true;

                throw {
                    code: 13,
                    msg: "The hostname belongs to tech-giant"
                };
                break;
            }
        }
    }


    return isThreat;
}

/**
 * 
 * @param {*} hostname 
 * @returns 
 */
const hostnameIsThreat = (hostname) => {
    let isThreat = false;

    for (let i = 0; i < blacklisteds.length; i++) {
        if (hostname === blacklisteds[i].hostname) {        // the hostname is blacklisted

            isThreat = true;

            throw {
                code: 11,
                msg: "The hostname is blacklisted"
            };
            break;
        }
    }

    if (!isThreat) {
        for (let n = 0; n < lawEnforcementAgencies.length; n++) {
            if (hostname === lawEnforcementAgencies[n].hostname) {

                isThreat = true;

                throw {
                    code: 12,
                    msg: "The hostname belongs to law enforcement agency"
                };
                break;
            }
        }
    }

    if (!isThreat) {
        for (let x = 0; x < techGiants; x++) {
            if (hostname === techGiants[x].hostname) {
                isThreat = true;

                throw {
                    code: 13,
                    msg: "The hostname belongs to tech-giant"
                };
                break;
            }
        }
    }

    return isThreat;
}

const clientNotThreat = (req, res, next) => {

    let clientHostName = req.hostname;
    let clientIpAddress = req.ip;


    try {
        hostnameIsThreat(clientHostName);
        ipIsThreat(clientIpAddress);
    } catch (err) {
        console.log("Error", err);
        res.status(400).send({
            errCode: err.code,
            errMsg: err.msg
        });
        return;
    }

    console.log("client not threat");

    next();
}

module.exports = clientNotThreat;
