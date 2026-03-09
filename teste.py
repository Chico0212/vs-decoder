from functools import reduce


def inv(x: int):
    soma = []
    fac = 10
    
    while x > 0:
        res = x%fac
        x = x//fac
        soma.append(res)

    tam = len(soma)-1
    
    r = 0
    for i in soma:
        r+=i*fac**tam
        
        tam-=1
    
    return r

print(inv(120))