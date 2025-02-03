// Task 1

function DeprecatedMethod(reason: string, alternative?: string) {
    return function (target: any, context: ClassMethodDecoratorContext) {
        if (context.kind !== 'method') throw new Error('Method-only decorator');
        const originalMethod = target;

        return function (...args: any[]) {
            console.warn(`Method '${String(context.name)}' is deprecated. ${reason}`);
            if (alternative) {
                console.warn(`Use '${alternative}' instead.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}

function MinLength(length: number) {
    return function (target: any, context: ClassFieldDecoratorContext) {
        return function (initialValue: string) {
            if (initialValue.length < length) {
                throw new Error(`${String(context.name)} must be at least ${length} characters long.`);
            }
            return initialValue;
        };
    };
}
//  Task 2
function MaxLength(length: number) {
    return function (target: any, context: ClassFieldDecoratorContext) {
        return function (initialValue: string) {
            if (initialValue.length > length) {
                throw new Error(`${String(context.name)} must be at most ${length} characters long.`);
            }
            return initialValue;
        };
    };
}

function Email(target: any, context: ClassFieldDecoratorContext) {
    return function (initialValue: string) {
        if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(initialValue)) {
            throw new Error(`${String(context.name)} must be a valid email address.`);
        }
        return initialValue;
    };
}
// Task 3
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
}