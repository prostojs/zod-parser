import { z } from 'zod'
import { parseZodType } from './parser'

describe('Zod Parser', () => {
    it('should parse ZodString', () => {
        const parsed = parseZodType(z.string())
        expect(parsed.$type).toBe('ZodString')
    })

    it('should parse ZodNumber', () => {
        const parsed = parseZodType(z.number())
        expect(parsed.$type).toBe('ZodNumber')
    })

    it('should parse ZodBoolean', () => {
        const parsed = parseZodType(z.boolean())
        expect(parsed.$type).toBe('ZodBoolean')
    })

    it('should parse ZodDate', () => {
        const parsed = parseZodType(z.date())
        expect(parsed.$type).toBe('ZodDate')
    })

    it('should parse ZodUndefined', () => {
        const parsed = parseZodType(z.undefined())
        expect(parsed.$type).toBe('ZodUndefined')
    })

    it('should parse ZodNull', () => {
        const parsed = parseZodType(z.null())
        expect(parsed.$type).toBe('ZodNull')
    })

    it('should parse ZodAny', () => {
        const parsed = parseZodType(z.any())
        expect(parsed.$type).toBe('ZodAny')
    })

    it('should parse ZodUnknown', () => {
        const parsed = parseZodType(z.unknown())
        expect(parsed.$type).toBe('ZodUnknown')
    })

    it('should parse ZodNever', () => {
        const parsed = parseZodType(z.never())
        expect(parsed.$type).toBe('ZodNever')
    })

    it('should parse ZodVoid', () => {
        const parsed = parseZodType(z.void())
        expect(parsed.$type).toBe('ZodVoid')
    })

    it('should parse ZodArray', () => {
        const parsed = parseZodType(z.array(z.string()))
        expect(parsed.$type).toBe('ZodArray')
        if (parsed.$type === 'ZodArray') {
            expect(parsed.$inner.$type).toBe('ZodString')
        }
    })

    it('should parse ZodObject', () => {
        const parsed = parseZodType(z.object({
            name: z.string(),
            age: z.number(),
        }))
        expect(parsed.$type).toBe('ZodObject')
        if (parsed.$type === 'ZodObject') {
            expect(parsed.$inner.name.$type).toBe('ZodString')
            expect(parsed.$inner.age.$type).toBe('ZodNumber')
        }
    })

    it('should parse ZodUnion', () => {
        const parsed = parseZodType(z.union([z.string(), z.number()]))
        expect(parsed.$type).toBe('ZodUnion')
        if (parsed.$type === 'ZodUnion') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
        }
    })

    it('should parse ZodIntersection', () => {
        const parsed = parseZodType(z.intersection(z.string(), z.number()))
        expect(parsed.$type).toBe('ZodIntersection')
        if (parsed.$type === 'ZodIntersection') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
        }
    })

    it('should parse ZodTuple', () => {
        const parsed = parseZodType(z.tuple([z.string(), z.number()]))
        expect(parsed.$type).toBe('ZodTuple')
        if (parsed.$type === 'ZodTuple') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
            expect(parsed.$value.hasRest).toBe(false)
        }
    })

    it('should parse ZodTuple .rest()', () => {
        const parsed = parseZodType(z.tuple([z.string(), z.number()]).rest(z.boolean()))
        expect(parsed.$type).toBe('ZodTuple')
        if (parsed.$type === 'ZodTuple') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
            expect(parsed.$inner[2].$type).toBe('ZodBoolean')
            expect(parsed.$value.hasRest).toBe(true)
        }
    })
    
    it('should parse ZodRecord', () => {
        const parsed = parseZodType(z.record(z.string(), z.number()))
        expect(parsed.$type).toBe('ZodRecord')
        if (parsed.$type === 'ZodRecord') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
        }
    })
    
    it('should parse ZodMap', () => {
        const parsed = parseZodType(z.map(z.string(), z.number()))
        expect(parsed.$type).toBe('ZodMap')
        if (parsed.$type === 'ZodMap') {
            expect(parsed.$inner[0].$type).toBe('ZodString')
            expect(parsed.$inner[1].$type).toBe('ZodNumber')
        }
    })
    
    it('should parse ZodSet', () => {
        const parsed = parseZodType(z.set(z.string()))
        expect(parsed.$type).toBe('ZodSet')
        if (parsed.$type === 'ZodSet') {
            expect(parsed.$inner.$type).toBe('ZodString')
        }
    })
    
    it('should parse ZodPromise', () => {
        const parsed = parseZodType(z.promise(z.string()))
        expect(parsed.$type).toBe('ZodPromise')
        if (parsed.$type === 'ZodPromise') {
            expect(parsed.$inner.$type).toBe('ZodString')
        }
    })
    
    it('should parse ZodLiteral', () => {
        const parsed = parseZodType(z.literal('hello'))
        expect(parsed.$type).toBe('ZodLiteral')
        if (parsed.$type === 'ZodLiteral') {
            expect(parsed.$value).toBe('hello')
        }
    })
    
    it('should parse ZodEnum', () => {
        const parsed = parseZodType(z.enum(['apple', 'banana']))
        expect(parsed.$type).toBe('ZodEnum')
        if (parsed.$type === 'ZodEnum') {
            expect(parsed.$value).toEqual(['apple', 'banana'])
        }
    })
    
    it('should parse ZodNativeEnum', () => {
        enum Fruits { Apple, Banana }
        const parsed = parseZodType(z.nativeEnum(Fruits))
        expect(parsed.$type).toBe('ZodNativeEnum')
        if (parsed.$type === 'ZodNativeEnum') {
            expect(parsed.$value).toEqual({0: 'Apple', 1: 'Banana', Apple: 0, Banana: 1})
        }
    })
    
    it('should parse ZodOptional', () => {
        const parsed = parseZodType(z.string().optional())
        expect(parsed.$type).toBe('ZodString')
        expect(parsed.$optional).toBe(true)
    })
    
    it('should parse ZodNullable', () => {
        const parsed = parseZodType(z.string().nullable())
        expect(parsed.$type).toBe('ZodString')
        expect(parsed.$nullable).toBe(true)
    })
    
    it('should parse ZodEffects', () => {
        const parsed = parseZodType(z.string().nullable().transform(s => s))
        expect(parsed.$type).toBe('ZodString')
        expect(parsed.$nullable).toBe(true)
    })
    
    it('should parse ZodCatch', () => {
        const parsed = parseZodType(z.string().catch('string'))
        expect(parsed.$type).toBe('ZodString')
    })
    
    it('should parse ZodBranded', () => {
        const parsed = parseZodType(z.string().brand())
        expect(parsed.$type).toBe('ZodString')
    })
    
    it('should parse ZodPipeline', () => {
        const parsed = parseZodType(z.string().pipe(z.number()))
        expect(parsed.$type).toBe('ZodString')
    })
    
    it('should parse ZodDefault', () => {
        const parsed = parseZodType(z.string().default('string'))
        expect(parsed.$type).toBe('ZodString')
    })
    
    it('should parse ZodLazy', () => {
        const lazyType = z.lazy(() => z.string())
        const parsed = parseZodType(lazyType)
        expect(parsed.$type).toBe('ZodLazy')
        if (parsed.$type === 'ZodLazy') {
            console.log({parsed})
            expect(parsed.$get().$type).toBe('ZodString')
        }
    })

    it('should parse ZodDiscriminatedUnion', () => {
        const AnimalSchema = z.discriminatedUnion('type', [
            z.object({
                type: z.literal('dog'),
                breed: z.string(),
            }),
            z.object({
                type: z.literal('bird'),
                species: z.string(),
            }),
        ])
      
        const parsed = parseZodType(AnimalSchema)
        expect(parsed.$type).toEqual('ZodDiscriminatedUnion')
        if (parsed.$type === 'ZodDiscriminatedUnion') {
            expect(parsed.$inner[0].$type).toEqual('ZodObject')
            expect(parsed.$inner[1].$type).toEqual('ZodObject')
            expect(parsed.$value.discriminator).toEqual('type')
            expect(parsed.$value.optionsMap.get('dog')?.$type).toEqual('ZodObject')
            expect(parsed.$value.optionsMap.get('bird')?.$type).toEqual('ZodObject')
        }
    })

    it('should parse ZodFunction', () => {
        const AnimalSchema = z.function().args(z.string()).returns(z.boolean())
      
        const parsed = parseZodType(AnimalSchema)
        expect(parsed.$type).toEqual('ZodFunction')
        if (parsed.$type === 'ZodFunction') {
            expect(parsed.$args.$type).toEqual('ZodTuple')
            if (parsed.$args.$type === 'ZodTuple') {
                expect(parsed.$args.$inner[0].$type).toEqual('ZodString')
                expect(parsed.$args.$inner[1].$type).toEqual('ZodUnknown')
                expect(parsed.$args.$value.hasRest).toEqual(true)
            }
            expect(parsed.$returns.$type).toEqual('ZodBoolean')
        }
    })

    it('should parse with formatter', () => {
        const schema = z.object({
            s: z.string(),
            a: z.number().array(),
            as: z.string().array(),
            b: z.boolean(),
        })

        const parsed = parseZodType(schema, (t) => {
            switch (t.$type) {
                case 'ZodString': return ''
                case 'ZodNumber': return 0
                case 'ZodBoolean': return false
                case 'ZodArray': return [t.$inner]
                case 'ZodObject': return t.$inner
                default: return undefined
            }
        })

        expect(parsed).toEqual({
            s: '', a: [0], b: false, as: [''],
        })
    })

    it('should process descriptions', () => {
        const schema = z.string().describe('test string')
        expect(parseZodType(schema, (p) => {
            return {
                type: p.$type,
                description: p.$ref._def.description || '',
            }
        })).toEqual({
            type: 'ZodString',
            description: 'test string',
        })
    })

    it('should extract constraits', () => {
        const rg = /test/
        expect(parseZodType(z.string().min(5).max(6).regex(rg)).$checks).toEqual({
            min: 5,
            max: 6,
            regex: rg,
        })
        expect(parseZodType(z.number().min(5).max(6)).$checks).toEqual({
            min: 5,
            max: 6,
        })
        expect(parseZodType(z.number().array().min(5).max(6)).$checks).toEqual({
            minLength: 5,
            maxLength: 6,
        })
        const now = new Date()
        const d2 = new Date('2000-01-01')
        expect(parseZodType(z.date().min(d2).max(now)).$checks).toEqual({
            min: d2.getTime(),
            max: now.getTime(),
        })
    })
})

