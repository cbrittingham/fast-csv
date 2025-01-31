import * as assert from 'assert';
import * as csv from '../../src';
import RecordingStream from '../RecordingStream';


describe('Issue #252 - https://github.com/C2FO/fast-csv/issues/252', () => {
    it('should keep the original row', (next) => {
        const rs = new RecordingStream();
        const data = [
            [ 'a', 'b', 'c' ],
            [ 'd', 'e', 'f' ],
        ];

        csv
            .write(data, {
                headers: [ 'header1', 'header2', 'header3' ],
            })
            .pipe(rs)
            .on('error', next)
            .on('finish', () => {
                assert.deepStrictEqual(rs.data.join(''), 'header1,header2,header3\na,b,c\nd,e,f');
                next();
            });
    });
});
