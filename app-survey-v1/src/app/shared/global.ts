import { KeyboardClassKey, IKeyboardLayouts } from '@ngx-material-keyboard/core';

export class Global {

    public static IS_ANY_QUESTION_ANSWER = false;

    public static DEFAULT_TIMER_VALIDATE_TOTEM_OPERACTIONAL = 10 * 1000; // 10 seconds
    public static DEFAULT_TIMER_MEA_WIN_NETWORK_SIGNAL = 300 * 1000; // 5 minutes

    public static CONFIG = 'assets/data/config.json';

    public static TOTEM_OPERACTIONAL = '/api/app/totem/operacional';
    public static GET_MEA_WIN_SIGNAL = '/api/mea/so/win/network/signal/quality';

    public static GET_SURVEY = '/api/survey/get';
    public static POST_SURVEY = '/api/survey/insert';

    public static GET_MIDIA = '/api/midia/get';

    public static IS_TEST_MODE = false;

    public static KeyboardCustomLayouts: IKeyboardLayouts = {
        'upperCaseLayout': {
            'name': 'upperCaseLayout',
            'keys': [
                [
                    ['Q'],
                    ['W'],
                    ['E'],
                    ['R'],
                    ['T'],
                    ['Y'],
                    ['U'],
                    ['I'],
                    ['O'],
                    ['P'],
                    [KeyboardClassKey.Bksp],
                ],
                [
                    ['A'],
                    ['S'],
                    ['D'],
                    ['F'],
                    ['G'],
                    ['H'],
                    ['J'],
                    ['K'],
                    ['L'],
                ],
                [
                    ['Z'],
                    ['X'],
                    ['C'],
                    ['V'],
                    ['B'],
                    ['N'],
                    ['M'],
                ],
                [
                    [KeyboardClassKey.Space],
                ]
            ],
            'lang': ['pt-Br']
        },
        'numberLayout': {
            'name': 'numberLayout',
            'keys': [
                [
                    ['7'],
                    ['8'],
                    ['9'],
                ],
                [
                    ['4'],
                    ['5'],
                    ['6'],
                ],
                [
                    ['1'],
                    ['2'],
                    ['3'],
                ],
                [
                    ['0'],
                    [KeyboardClassKey.Bksp],
                ]
            ],
            'lang': ['pt-Br']
        }
    };

}
