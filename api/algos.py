def string_comparator(s1: str, s2: str):
    s1_len, s2_len = len(s1), len(s2)
    tot_len = s1_len + s2_len

    i = 0
    catches = 0
    while i < s1_len and i < s2_len:
        if s1[i].lower() == s2[i].lower():
            catches += 1
        i += 1
    
    pct_1 = catches / s1_len
    pct_2 = catches / s2_len
    return ((pct_1 + pct_2 / tot_len) * 100).__round__(2)