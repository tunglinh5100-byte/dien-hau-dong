import sys, json
def tf(top,bot,cx,H): s=H/(bot-top); return [round(s,3), round(178-s*cx,1), round(585-s*bot,1)]
def make(meas, stand, sit, override={}):
    T={'thinh':[0.756,39.9,159.9],'tungkhan':[0.756,39.9,159.9]}; D={'thinh':159,'tungkhan':159}
    for n,(top,bot,cx) in meas.items():
        t0=override.get(n,top); H=390 if n in stand else 305
        T[n]=tf(t0,bot,cx,H); D[n]=int(top)
    return T,D
