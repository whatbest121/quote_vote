import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    a(number1: number, number2: number) {
        return number1 + number2
    }
}
