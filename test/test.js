const chai = typeof this.chai === 'undefined'
	? require('chai')
	: this.chai;

const expect = typeof this.expect === 'undefined'
	? chai.expect
	: this.expect;

const OTPAuth = typeof this.OTPAuth === 'undefined'
	/* eslint-disable-next-line import/no-dynamic-require */
	? require(process.env.IS_MINIFIED ? '../dist/otpauth.min.js' : '../dist/otpauth.js')
	: this.OTPAuth;

chai.Assertion.addMethod('bufferEql', function bufferEql(x) {
	const expected = new Uint8Array(x);
	const actual = new Uint8Array(this._obj);

	this.assert(
		chai.util.eql(actual, expected),
		'expected #{act} to be equal to #{exp}',
		'expected #{act} not to be equal to #{exp}',
		expected, actual
	);
});

const inputs = [{
	// 00
	buffer: new Uint16Array([43166, 43963, 43559, 29521, 19166, 19613, 5178, 6152, 37930, 252, 24507, 64210, 28982, 57540, 65533, 54088, 54415, 2014, 50282, 22992]).buffer,
	raw: '\u009E\u00A8\u00BB\u00AB\u0027\u00AA\u0051\u0073\u00DE\u004A\u009D\u004C\u003A\u0014\u0008\u0018\u002A\u0094\u00FC\u0000\u00BB\u005F\u00D2\u00FA\u0036\u0071\u00C4\u00E0\u00FD\u00FF\u0048\u00D3\u008F\u00D4\u00DE\u0007\u006A\u00C4\u00D0\u0059',
	b32: 'T2ULXKZHVJIXHXSKTVGDUFAIDAVJJ7AAXNP5F6RWOHCOB7P7JDJY7VG6A5VMJUCZ',
	hex: '9EA8BBAB27AA5173DE4A9D4C3A1408182A94FC00BB5FD2FA3671C4E0FDFF48D38FD4DE076AC4D059',
	hotp: {
		constructor: {
			input: { algorithm: 'SHA1' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '136591'
		},
		validate: {
			input: { token: '136591', counter: 1e10 - 90, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=T2ULXKZHVJIXHXSKTVGDUFAIDAVJJ7AAXNP5F6RWOHCOB7P7JDJY7VG6A5VMJUCZ&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { algorithm: 'SHA1', period: 5 }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '823248'
		},
		validate: {
			input: { token: '823248', timestamp: 1451606450000 },
			output: -10
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=T2ULXKZHVJIXHXSKTVGDUFAIDAVJJ7AAXNP5F6RWOHCOB7P7JDJY7VG6A5VMJUCZ&algorithm=SHA1&digits=6&period=5'
		}
	}
}, {
	// 01
	buffer: new Uint16Array([18090, 48480, 27991, 30797, 47976, 51345, 8708, 48040, 20922, 20926, 9312, 49305, 30776, 7291, 42211, 63590, 1158, 12256, 50671, 40876]).buffer,
	raw: '\u00AA\u0046\u0060\u00BD\u0057\u006D\u004D\u0078\u0068\u00BB\u0091\u00C8\u0004\u0022\u00A8\u00BB\u00BA\u0051\u00BE\u0051\u0060\u0024\u0099\u00C0\u0038\u0078\u007B\u001C\u00E3\u00A4\u0066\u00F8\u0086\u0004\u00E0\u002F\u00EF\u00C5\u00AC\u009F',
	b32: 'VJDGBPKXNVGXQ2F3SHEAIIVIXO5FDPSRMASJTQBYPB5RZY5EM34IMBHAF7X4LLE7',
	hex: 'AA4660BD576D4D7868BB91C80422A8BBBA51BE51602499C038787B1CE3A466F88604E02FEFC5AC9F',
	hotp: {
		constructor: {
			input: { algorithm: 'SHA256' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '728219'
		},
		validate: {
			input: { token: '728219', counter: 1e10 - 90, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=VJDGBPKXNVGXQ2F3SHEAIIVIXO5FDPSRMASJTQBYPB5RZY5EM34IMBHAF7X4LLE7&algorithm=SHA256&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { algorithm: 'SHA256', period: 10 }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '530988'
		},
		validate: {
			input: { token: '530988', timestamp: 1451606500000 },
			output: -10
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=VJDGBPKXNVGXQ2F3SHEAIIVIXO5FDPSRMASJTQBYPB5RZY5EM34IMBHAF7X4LLE7&algorithm=SHA256&digits=6&period=10'
		}
	}
}, {
	// 02
	buffer: new Uint16Array([32525, 58802, 54704, 50846, 842, 31285, 32289, 64282, 36479, 51558, 50702, 18096, 65533, 12308, 65533, 39346, 5951, 54232, 34271, 18845]).buffer,
	raw: '\u000D\u007F\u00B2\u00E5\u00B0\u00D5\u009E\u00C6\u004A\u0003\u0035\u007A\u0021\u007E\u001A\u00FB\u007F\u008E\u0066\u00C9\u000E\u00C6\u00B0\u0046\u00FD\u00FF\u0014\u0030\u00FD\u00FF\u00B2\u0099\u003F\u0017\u00D8\u00D3\u00DF\u0085\u009D\u0049',
	b32: 'BV73FZNQ2WPMMSQDGV5CC7Q27N7Y4ZWJB3DLARX574KDB7P7WKMT6F6Y2PPYLHKJ',
	hex: '0D7FB2E5B0D59EC64A03357A217E1AFB7F8E66C90EC6B046FDFF1430FDFFB2993F17D8D3DF859D49',
	hotp: {
		constructor: {
			input: { algorithm: 'SHA512' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '812759'
		},
		validate: {
			input: { token: '812759', counter: 1e10 - 90, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=BV73FZNQ2WPMMSQDGV5CC7Q27N7Y4ZWJB3DLARX574KDB7P7WKMT6F6Y2PPYLHKJ&algorithm=SHA512&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { algorithm: 'SHA512', period: 15 }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '069364'
		},
		validate: {
			input: { token: '069364', timestamp: 1451606550000 },
			output: -10
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=BV73FZNQ2WPMMSQDGV5CC7Q27N7Y4ZWJB3DLARX574KDB7P7WKMT6F6Y2PPYLHKJ&algorithm=SHA512&digits=6&period=15'
		}
	}
}, {
	// 03
	buffer: new Uint16Array([51037, 23628, 33758, 7831, 60635, 33945, 53212, 34347, 30503, 20017, 25741, 52882, 1730, 34105, 43705, 34358, 11389, 21091, 43338, 32591]).buffer,
	raw: '\u005D\u00C7\u004C\u005C\u00DE\u0083\u0097\u001E\u00DB\u00EC\u0099\u0084\u00DC\u00CF\u002B\u0086\u0027\u0077\u0031\u004E\u008D\u0064\u0092\u00CE\u00C2\u0006\u0039\u0085\u00B9\u00AA\u0036\u0086\u007D\u002C\u0063\u0052\u004A\u00A9\u004F\u007F',
	b32: 'LXDUYXG6QOLR5W7MTGCNZTZLQYTXOMKORVSJFTWCAY4YLONKG2DH2LDDKJFKST37',
	hex: '5DC74C5CDE83971EDBEC9984DCCF2B862777314E8D6492CEC2063985B9AA36867D2C63524AA94F7F',
	hotp: {
		constructor: {
			input: { digits: 6, issuer: 'ACME' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '692310'
		},
		validate: {
			input: { token: '692310', counter: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://hotp/ACME:OTPAuth?issuer=ACME&secret=LXDUYXG6QOLR5W7MTGCNZTZLQYTXOMKORVSJFTWCAY4YLONKG2DH2LDDKJFKST37&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { digits: 6, issuer: 'ACME' }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '096972'
		},
		validate: {
			input: { token: '096972', timestamp: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://totp/ACME:OTPAuth?issuer=ACME&secret=LXDUYXG6QOLR5W7MTGCNZTZLQYTXOMKORVSJFTWCAY4YLONKG2DH2LDDKJFKST37&algorithm=SHA1&digits=6&period=30'
		}
	}
}, {
	// 04
	buffer: new Uint16Array([21530, 65533, 31457, 21867, 48007, 30404, 49757, 60647, 22494, 54350, 45498, 45781, 50410, 3426, 24674, 4442, 45282, 62405, 29459, 49678]).buffer,
	raw: '\u001A\u0054\u00FD\u00FF\u00E1\u007A\u006B\u0055\u0087\u00BB\u00C4\u0076\u005D\u00C2\u00E7\u00EC\u00DE\u0057\u004E\u00D4\u00BA\u00B1\u00D5\u00B2\u00EA\u00C4\u0062\u000D\u0062\u0060\u005A\u0011\u00E2\u00B0\u00C5\u00F3\u0013\u0073\u000E\u00C2',
	b32: 'DJKP377BPJVVLB53YR3F3QXH5TPFOTWUXKY5LMXKYRRA2YTALII6FMGF6MJXGDWC',
	hex: '1A54FDFFE17A6B5587BBC4765DC2E7ECDE574ED4BAB1D5B2EAC4620D62605A11E2B0C5F313730EC2',
	hotp: {
		constructor: {
			input: { digits: 7, label: 'Username' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '9926814'
		},
		validate: {
			input: { token: '9926814', counter: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://hotp/Username?secret=DJKP377BPJVVLB53YR3F3QXH5TPFOTWUXKY5LMXKYRRA2YTALII6FMGF6MJXGDWC&algorithm=SHA1&digits=7&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { digits: 7, label: 'Username' }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '6614389'
		},
		validate: {
			input: { token: '6614389', timestamp: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://totp/Username?secret=DJKP377BPJVVLB53YR3F3QXH5TPFOTWUXKY5LMXKYRRA2YTALII6FMGF6MJXGDWC&algorithm=SHA1&digits=7&period=30'
		}
	}
}, {
	// 05
	buffer: new Uint16Array([14646, 41460, 53078, 31118, 12968, 28155, 26734, 2876, 14486, 2483, 60944, 3819, 43040, 51157, 61274, 57439, 47819, 46060, 31835, 64784]).buffer,
	raw: '\u0036\u0039\u00F4\u00A1\u0056\u00CF\u008E\u0079\u00A8\u0032\u00FB\u006D\u006E\u0068\u003C\u000B\u0096\u0038\u00B3\u0009\u0010\u00EE\u00EB\u000E\u0020\u00A8\u00D5\u00C7\u005A\u00EF\u005F\u00E0\u00CB\u00BA\u00EC\u00B3\u005B\u007C\u0010\u00FD',
	b32: 'GY47JIKWZ6HHTKBS7NWW42B4BOLDRMYJCDXOWDRAVDK4OWXPL7QMXOXMWNNXYEH5',
	hex: '3639F4A156CF8E79A832FB6D6E683C0B9638B30910EEEB0E20A8D5C75AEF5FE0CBBAECB35B7C10FD',
	hotp: {
		constructor: {
			input: { digits: 8, issuer: 'ACME Co', label: 'Firstname Lastname' }
		},
		generate: {
			input: { counter: 1e10 },
			output: '76351593'
		},
		validate: {
			input: { token: '76351593', counter: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://hotp/ACME%20Co:Firstname%20Lastname?issuer=ACME%20Co&secret=GY47JIKWZ6HHTKBS7NWW42B4BOLDRMYJCDXOWDRAVDK4OWXPL7QMXOXMWNNXYEH5&algorithm=SHA1&digits=8&counter=0'
		}
	},
	totp: {
		constructor: {
			input: { digits: 8, issuer: 'ACME Co', label: 'Firstname Lastname' }
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '57578252'
		},
		validate: {
			input: { token: '57578252', timestamp: 0 },
			output: null
		},
		toString: {
			output: 'otpauth://totp/ACME%20Co:Firstname%20Lastname?issuer=ACME%20Co&secret=GY47JIKWZ6HHTKBS7NWW42B4BOLDRMYJCDXOWDRAVDK4OWXPL7QMXOXMWNNXYEH5&algorithm=SHA1&digits=8&period=30'
		}
	}
}, {
	// 06
	buffer: new Uint16Array([6952, 59382, 49227, 46820, 62400, 43213, 1294, 31142, 1178, 21964, 36167, 26389, 58911, 9677, 51244, 15092, 19914, 38706, 3646, 58573]).buffer,
	raw: '\u0028\u001B\u00F6\u00E7\u004B\u00C0\u00E4\u00B6\u00C0\u00F3\u00CD\u00A8\u000E\u0005\u00A6\u0079\u009A\u0004\u00CC\u0055\u0047\u008D\u0015\u0067\u001F\u00E6\u00CD\u0025\u002C\u00C8\u00F4\u003A\u00CA\u004D\u0032\u0097\u003E\u000E\u00CD\u00E4',
	b32: 'FAN7NZ2LYDSLNQHTZWUA4BNGPGNAJTCVI6GRKZY743GSKLGI6Q5MUTJSS47A5TPE',
	hex: '281BF6E74BC0E4B6C0F3CDA80E05A6799A04CC55478D15671FE6CD252CC8F43ACA4D32973E0ECDE4',
	hotp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { counter: 1e10 },
			output: '462236'
		},
		validate: {
			input: { token: '462236', counter: 1e10 + 10 },
			output: -10
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=FAN7NZ2LYDSLNQHTZWUA4BNGPGNAJTCVI6GRKZY743GSKLGI6Q5MUTJSS47A5TPE&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '211496'
		},
		validate: {
			input: { token: '211496', timestamp: 1451603700000, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=FAN7NZ2LYDSLNQHTZWUA4BNGPGNAJTCVI6GRKZY743GSKLGI6Q5MUTJSS47A5TPE&algorithm=SHA1&digits=6&period=30'
		}
	}
}, {
	// 07
	buffer: new Uint16Array([36033, 1942, 57802, 13299, 6193, 59972, 65533, 63130, 15420, 38697, 61727, 17566, 24165, 31833, 44414, 46673, 22869, 25260, 59361, 37446]).buffer,
	raw: '\u00C1\u008C\u0096\u0007\u00CA\u00E1\u00F3\u0033\u0031\u0018\u0044\u00EA\u00FD\u00FF\u009A\u00F6\u003C\u003C\u0029\u0097\u001F\u00F1\u009E\u0044\u0065\u005E\u0059\u007C\u007E\u00AD\u0051\u00B6\u0055\u0059\u00AC\u0062\u00E1\u00E7\u0046\u0092',
	b32: 'YGGJMB6K4HZTGMIYITVP37426Y6DYKMXD7YZ4RDFLZMXY7VNKG3FKWNMMLQ6ORUS',
	hex: 'C18C9607CAE1F333311844EAFDFF9AF63C3C29971FF19E44655E597C7EAD51B65559AC62E1E74692',
	hotp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { counter: 1e10 },
			output: '203969'
		},
		validate: {
			input: { token: '203969', counter: 1e10 + 10 },
			output: -10
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=YGGJMB6K4HZTGMIYITVP37426Y6DYKMXD7YZ4RDFLZMXY7VNKG3FKWNMMLQ6ORUS&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '946384'
		},
		validate: {
			input: { token: '946384', timestamp: 1451603700000, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=YGGJMB6K4HZTGMIYITVP37426Y6DYKMXD7YZ4RDFLZMXY7VNKG3FKWNMMLQ6ORUS&algorithm=SHA1&digits=6&period=30'
		}
	}
}, {
	// 08
	buffer: new Uint16Array([20412, 49784, 65451, 25185, 19043, 3957, 48751, 34068, 8924, 27365, 1945, 44024, 14202, 54242, 54475, 37844, 27053, 57858, 9905, 37141]).buffer,
	raw: '\u00BC\u004F\u0078\u00C2\u00AB\u00FF\u0061\u0062\u0063\u004A\u0075\u000F\u006F\u00BE\u0014\u0085\u00DC\u0022\u00E5\u006A\u0099\u0007\u00F8\u00AB\u007A\u0037\u00E2\u00D3\u00CB\u00D4\u00D4\u0093\u00AD\u0069\u0002\u00E2\u00B1\u0026\u0015\u0091',
	b32: 'XRHXRQVL75QWEY2KOUHW7PQUQXOCFZLKTED7RK32G7RNHS6U2SJ222IC4KYSMFMR',
	hex: 'BC4F78C2ABFF6162634A750F6FBE1485DC22E56A9907F8AB7A37E2D3CBD4D493AD6902E2B1261591',
	hotp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { counter: 1e10 },
			output: '833717'
		},
		validate: {
			input: { token: '833717', counter: 1e10 + 10 },
			output: -10
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=XRHXRQVL75QWEY2KOUHW7PQUQXOCFZLKTED7RK32G7RNHS6U2SJ222IC4KYSMFMR&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '875381'
		},
		validate: {
			input: { token: '875381', timestamp: 1451603700000, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=XRHXRQVL75QWEY2KOUHW7PQUQXOCFZLKTED7RK32G7RNHS6U2SJ222IC4KYSMFMR&algorithm=SHA1&digits=6&period=30'
		}
	}
}, {
	// 09
	buffer: new Uint16Array([1319, 4080, 36928, 43915, 63050, 33017, 65533, 33717, 27409, 32302, 47857, 291, 44387, 44158, 32840, 33103, 33267, 14581, 37425, 15343]).buffer,
	raw: '\u0027\u0005\u00F0\u000F\u0040\u0090\u008B\u00AB\u004A\u00F6\u00F9\u0080\u00FD\u00FF\u00B5\u0083\u0011\u006B\u002E\u007E\u00F1\u00BA\u0023\u0001\u0063\u00AD\u007E\u00AC\u0048\u0080\u004F\u0081\u00F3\u0081\u00F5\u0038\u0031\u0092\u00EF\u003B',
	b32: 'E4C7AD2ASCF2WSXW7GAP375VQMIWWLT66G5CGALDVV7KYSEAJ6A7HAPVHAYZF3Z3',
	hex: '2705F00F40908BAB4AF6F980FDFFB583116B2E7EF1BA230163AD7EAC48804F81F381F5383192EF3B',
	hotp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { counter: 1e10 },
			output: '865988'
		},
		validate: {
			input: { token: '865988', counter: 1e10 + 10 },
			output: -10
		},
		toString: {
			output: 'otpauth://hotp/OTPAuth?secret=E4C7AD2ASCF2WSXW7GAP375VQMIWWLT66G5CGALDVV7KYSEAJ6A7HAPVHAYZF3Z3&algorithm=SHA1&digits=6&counter=0'
		}
	},
	totp: {
		constructor: {
			input: {}
		},
		generate: {
			input: { timestamp: 1451606400000 },
			output: '893785'
		},
		validate: {
			input: { token: '893785', timestamp: 1451603700000, window: 100 },
			output: 90
		},
		toString: {
			output: 'otpauth://totp/OTPAuth?secret=E4C7AD2ASCF2WSXW7GAP375VQMIWWLT66G5CGALDVV7KYSEAJ6A7HAPVHAYZF3Z3&algorithm=SHA1&digits=6&period=30'
		}
	}
}];

/* ================================================
 * Utils
 * ================================================
 */

describe('OTPAuth.Utils', () => {
	it('uint.decode[0]', () => {
		const output = OTPAuth.Utils.uint.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]).buffer);
		expect(output).to.equal(0);
	});

	it('uint.decode[1]', () => {
		const output = OTPAuth.Utils.uint.decode(new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]).buffer);
		expect(output).to.equal(4294967295);
	});

	it('uint.decode[2]', () => { // MAX_SAFE_INTEGER
		const output = OTPAuth.Utils.uint.decode(new Uint8Array([0, 31, 255, 255, 255, 255, 255, 255]).buffer);
		expect(output).to.equal(9007199254740991);
	});

	it('uint.encode[0]', () => {
		const output = OTPAuth.Utils.uint.encode(0);
		expect(output).to.bufferEql(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]).buffer);
	});

	it('uint.encode[1]', () => {
		const output = OTPAuth.Utils.uint.encode(4294967295);
		expect(output).to.bufferEql(new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]).buffer);
	});

	it('uint.encode[2]', () => { // MAX_SAFE_INTEGER
		const output = OTPAuth.Utils.uint.encode(9007199254740991);
		expect(output).to.bufferEql(new Uint8Array([0, 31, 255, 255, 255, 255, 255, 255]).buffer);
	});

	inputs.forEach((input, index) => {
		it(`raw.decode[${index}]`, () => {
			const output = OTPAuth.Utils.raw.decode(input.buffer);
			expect(output).to.equal(input.raw);
		});
	});

	inputs.forEach((input, index) => {
		it(`raw.encode[${index}]`, () => {
			const output = OTPAuth.Utils.raw.encode(input.raw);
			expect(output).to.bufferEql(input.buffer);
		});
	});

	inputs.forEach((input, index) => {
		it(`b32.decode[${index}]`, () => {
			const output = OTPAuth.Utils.b32.decode(input.buffer);
			expect(output).to.equal(input.b32);
		});
	});

	inputs.forEach((input, index) => {
		it(`b32.encode[${index}]`, () => {
			const output = OTPAuth.Utils.b32.encode(input.b32);
			expect(output).to.bufferEql(input.buffer);
		});
	});

	inputs.forEach((input, index) => {
		it(`hex.decode[${index}]`, () => {
			const output = OTPAuth.Utils.hex.decode(input.buffer);
			expect(output).to.equal(input.hex);
		});
	});

	inputs.forEach((input, index) => {
		it(`hex.encode[${index}]`, () => {
			const output = OTPAuth.Utils.hex.encode(input.hex);
			expect(output).to.bufferEql(input.buffer);
		});
	});
});

/* ================================================
 * Secret
 * ================================================
 */

describe('Test - OTPAuth.Secret', () => {
	inputs.forEach((input, index) => {
		it(`constructor[${index}]`, () => {
			const output = new OTPAuth.Secret({ buffer: input.buffer });

			expect(output).to.eql({
				raw: input.raw,
				b32: input.b32,
				hex: input.hex,
				buffer: input.buffer
			});

			expect(output.buffer).to.bufferEql(input.buffer);
		});
	});

	it(`constructor[${inputs.length}]`, () => {
		const output = new OTPAuth.Secret({ size: 256 });

		expect(output).to.be.an('object');
		expect(output.buffer).to.be.an('arrayBuffer');
		expect(output.buffer.byteLength).to.equal(256);
		expect(output.raw).to.be.a('string');
		expect(output.b32).to.be.a('string');
		expect(output.b32).to.match(/^[2-7A-Z]{410}$/);
		expect(output.hex).to.be.a('string');
		expect(output.hex).to.match(/^[0-9A-F]{512}$/);
	});

	it(`constructor[${inputs.length + 1}]`, () => {
		const output = new OTPAuth.Secret();

		expect(output).to.be.an('object');
		expect(output.buffer).to.be.an('arrayBuffer');
		expect(output.buffer.byteLength).to.equal(20);
		expect(output.b32).to.be.a('string');
		expect(output.b32).to.match(/^[2-7A-Z]{32}$/);
		expect(output.hex).to.be.a('string');
		expect(output.hex).to.match(/^[0-9A-F]{40}$/);
	});

	inputs.forEach((input, index) => {
		it(`fromRaw[${index}]`, () => {
			const output = OTPAuth.Secret.fromRaw(input.raw);

			expect(output).to.eql({
				raw: input.raw,
				b32: input.b32,
				hex: input.hex,
				buffer: input.buffer
			});

			expect(output.buffer).to.bufferEql(input.buffer);
		});
	});

	inputs.forEach((input, index) => {
		it(`fromB32[${index}]`, () => {
			const output = OTPAuth.Secret.fromB32(input.b32);

			expect(output).to.eql({
				raw: input.raw,
				b32: input.b32,
				hex: input.hex,
				buffer: input.buffer
			});

			expect(output.buffer).to.bufferEql(input.buffer);
		});
	});

	inputs.forEach((input, index) => {
		it(`fromHex[${index}]`, () => {
			const output = OTPAuth.Secret.fromHex(input.hex);

			expect(output).to.eql({
				raw: input.raw,
				b32: input.b32,
				hex: input.hex,
				buffer: input.buffer
			});

			expect(output.buffer).to.bufferEql(input.buffer);
		});
	});
});

/* ================================================
 * HOTP
 * ================================================
 */

describe('Test - OTPAuth.HOTP', () => {
	it('defaults', () => {
		const hotp = new OTPAuth.HOTP();

		expect(hotp).to.be.an('object');
		expect(hotp.issuer).to.equal('');
		expect(hotp.label).to.equal('OTPAuth');
		expect(hotp.secret).to.be.instanceof(OTPAuth.Secret);
		expect(hotp.algorithm).to.equal('SHA1');
		expect(hotp.digits).to.equal(6);
		expect(hotp.counter).to.equal(0);

		expect(hotp.generate()).to.be.a('string');
		expect(hotp.generate()).to.have.lengthOf(6);
		expect(hotp.generate({ pad: false })).to.a('number');

		expect(hotp.validate({ token: hotp.generate() })).to.equal(-1);

		// Counter is incremented on each 'generate' call
		expect(hotp.counter).to.equal(4);
	});

	inputs.forEach((input, index) => {
		it(`generate[${index}]`, () => {
			const constructorInput = input.hotp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const hotp = new OTPAuth.HOTP(constructorInput);

			const generateInput = input.hotp.generate.input;
			const output = hotp.generate(generateInput);

			expect(output).to.equal(input.hotp.generate.output);
		});
	});

	inputs.forEach((input, index) => {
		it(`validate[${index}]`, () => {
			const constructorInput = input.hotp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const hotp = new OTPAuth.HOTP(constructorInput);

			const validateInput = input.hotp.validate.input;
			const output = hotp.validate(validateInput);

			expect(output).to.equal(input.hotp.validate.output);
		});
	});

	inputs.forEach((input, index) => {
		it(`toString[${index}]`, () => {
			const constructorInput = input.hotp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const hotp = new OTPAuth.HOTP(constructorInput);

			const output = hotp.toString();

			expect(output).to.equal(input.hotp.toString.output);
		});
	});
});

/* ================================================
 * TOTP
 * ================================================
 */

describe('Test - OTPAuth.TOTP', () => {
	it('defaults', () => {
		const totp = new OTPAuth.TOTP();

		expect(totp).to.be.an('object');
		expect(totp.issuer).to.equal('');
		expect(totp.label).to.equal('OTPAuth');
		expect(totp.secret).to.be.instanceof(OTPAuth.Secret);
		expect(totp.algorithm).to.equal('SHA1');
		expect(totp.digits).to.equal(6);
		expect(totp.period).to.equal(30);

		expect(totp.generate()).to.be.a('string');
		expect(totp.generate()).to.have.lengthOf(6);
		expect(totp.generate({ pad: false })).to.a('number');

		expect(totp.validate({ token: totp.generate() })).to.equal(0);
	});

	inputs.forEach((input, index) => {
		it(`generate[${index}]`, () => {
			const constructorInput = input.totp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const totp = new OTPAuth.TOTP(constructorInput);

			const generateInput = input.totp.generate.input;
			const output = totp.generate(generateInput);

			expect(output).to.equal(input.totp.generate.output);
		});
	});

	inputs.forEach((input, index) => {
		it(`validate[${index}]`, () => {
			const constructorInput = input.totp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const totp = new OTPAuth.TOTP(constructorInput);

			const validateInput = input.totp.validate.input;
			const output = totp.validate(validateInput);

			expect(output).to.equal(input.totp.validate.output);
		});
	});

	inputs.forEach((input, index) => {
		it(`toString[${index}]`, () => {
			const constructorInput = input.totp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const totp = new OTPAuth.TOTP(constructorInput);

			const output = totp.toString();

			expect(output).to.equal(input.totp.toString.output);
		});
	});
});

/* ================================================
 * URI
 * ================================================
 */

describe('Test - OTPAuth.URI', () => {
	inputs.forEach((input, index) => {
		it(`parse[${index}] - HOTP`, () => {
			const constructorInput = input.hotp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const hotp = new OTPAuth.HOTP(constructorInput);

			const output = OTPAuth.URI.parse(input.hotp.toString.output);

			expect(output).to.eql(hotp);
		});
	});

	inputs.forEach((input, index) => {
		it(`parse[${index}] - TOTP`, () => {
			const constructorInput = input.totp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const totp = new OTPAuth.TOTP(constructorInput);

			const output = OTPAuth.URI.parse(input.totp.toString.output);

			expect(output).to.eql(totp);
		});
	});

	inputs.forEach((input, index) => {
		it(`stringify[${index}] - HOTP`, () => {
			const constructorInput = input.hotp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const hotp = new OTPAuth.HOTP(constructorInput);

			const output = OTPAuth.URI.stringify(hotp);

			expect(output).to.equal(input.hotp.toString.output);
		});
	});

	inputs.forEach((input, index) => {
		it(`stringify[${index}] - TOTP`, () => {
			const constructorInput = input.totp.constructor.input;
			constructorInput.secret = new OTPAuth.Secret({ buffer: input.buffer });
			const totp = new OTPAuth.TOTP(constructorInput);

			const output = OTPAuth.URI.stringify(totp);

			expect(output).to.equal(input.totp.toString.output);
		});
	});

	it(`stringify[${inputs.length}] - TOTP`, () => {
		const totp = new OTPAuth.TOTP({
			issuer: 'ACME',
			label: 'AzureDiamond',
			secret: new OTPAuth.Secret({
				buffer: OTPAuth.Utils.b32.encode('NB2W45DFOIZA')
			})
		});

		const output = OTPAuth.URI.stringify(totp, { legacyIssuer: true });
		const expected = 'otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30';

		expect(output).to.equal(expected);
	});

	it(`stringify[${inputs.length + 1}] - TOTP`, () => {
		const totp = new OTPAuth.TOTP({
			issuer: 'ACME',
			label: 'AzureDiamond',
			secret: new OTPAuth.Secret({
				buffer: OTPAuth.Utils.b32.encode('NB2W45DFOIZA')
			})
		});

		const output = OTPAuth.URI.stringify(totp, { legacyIssuer: false });
		const expected = 'otpauth://totp/AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30';

		expect(output).to.equal(expected);
	});
});

/* ================================================
 * Version
 * ================================================
 */

describe('Test - OTPAuth.version', () => {
	it('version', () => {
		expect(OTPAuth.version).to.be.a('string');
	});
});
