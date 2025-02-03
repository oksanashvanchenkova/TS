// Task1
function DeprecatedMethod(reason: string, alternative?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.warn(`Method '${propertyKey}' is deprecated. ${reason}`);
            if (alternative) {
                console.warn(`Use '${alternative}' instead.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}

// Task 2
function MinLength(length: number) {
    return function (target: any, propertyKey: string) {
        let value: string;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length < length) {
                    throw new Error(`${propertyKey} must be at least ${length} characters long.`);
                }
                value = newValue;
            },
        });
    };
}

function MaxLength(length: number) {
    return function (target: any, propertyKey: string) {
        let value: string;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length > length) {
                    throw new Error(`${propertyKey} must be at most ${length} characters long.`);
                }
                value = newValue;
            },
        });
    };
}

function Email(target: any, propertyKey: string) {
    let value: string;
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(newValue)) {
                throw new Error(`${propertyKey} must be a valid email address.`);
            }
            value = newValue;
        },
    });
}

// Task3 
class User {
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @Email
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    @DeprecatedMethod("This method is slow.", "newMethod")
    oldMethod() {
        console.log("Running old method...");
    }

    newMethod() {
        console.log("Running new method...");
    }
}