class RegisterModel {
    constructor() {
        this.username = undefined;
        this.email = undefined;
        this.password = undefined;
        this.confirmPassword = undefined;
        this.role = 'User';
        this.agreeToTerms = false;
    }

    setUsername(username) {
        this.username = username;
        return this;
    }

    setEmail(email) {
        this.email = email;
        return this;
    }

    setPassword(password) {
        this.password = password;
        return this;
    }

    setConfirmPassword(confirmPassword) {
        this.confirmPassword = confirmPassword;
        return this;
    }

    setRole(role) {
        this.role = role;
        return this;
    }

    setAgreeToTerms(agree) {
        this.agreeToTerms = agree;
        return this;
    }

    build() {
        return this;
    }
}

export default RegisterModel;
