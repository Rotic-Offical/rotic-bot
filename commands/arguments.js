class ArgumentManager
{
    requiredArgs = 0;

    constructor(args)
    {
        this.argInfos = [];
        this.args = args;
    }

    on(arg, argIndex, optional, callback)
    {
        let argCallback = this.argInfos[argIndex];

        if (argCallback == undefined)
        {
            if (!optional)
                this.requiredArgs++;

            let argObj = {
                values: [],
                optional: optional,
                callbacks: []
            };

            this.argInfos[argIndex] = argObj;
            argCallback = argObj;
        }

        argCallback.values.push(arg);
        argCallback.callbacks.push(callback);

        return this;
    }

    parse()
    {
        if (this.args.length < this.requiredArgs)
        {
            throw 'Not enough arguments';
        }

        for (let i = 0; i < this.args.length; i++)
        {
            const arg = this.args[i];
            
            let argInfo = this.argInfos[i];
            let callbackIndex = -1;

            if (argInfo == undefined)
            {
                throw 'Invalid command argument index';
            }

            for (let j = 0; j < argInfo.values.length; j++)
            {
                const value = argInfo.values[j];
                if (arg == value)
                {
                    callbackIndex = j;
                    break;
                }
            }

            console.log(arg);

            if (callbackIndex >= 0)
            {
                argInfo.callbacks[callbackIndex]();
            }
            else if (!argInfo.optional)
            {
                throw `${arg} is not a valid argument!`;
            }
        }
    }
}

module.exports = {
    ArgumentManager: ArgumentManager
};
