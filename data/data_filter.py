import json

with open('data.csv', 'r') as file:
    data = file.readlines()
    info = [linea.strip('\n').split(',') for linea in data]

# ########CLUBES###########
clubes_repetidos = [linea[5] for linea in info[1:]]
clubes = list(set(clubes_repetidos))

clubes_goles = {club: 0 for club in clubes}
for club in clubes:
    clubes_goles[club] = clubes_repetidos.count(club)

# ########AÑOS###########
años_repetidos = ['20' + linea[3][-2] + linea[3][-1] for linea in info[1:]]
años = list(set(años_repetidos))
años.sort()
cantidad_goles_año = {año: 0 for año in años}
for año in años:
    cantidad_goles_año[año] = años_repetidos.count(año)


# ########TIPOS DE GOLES###########
tipo_gol_repetido = [linea[11] for linea in info[1:] if linea[11] != '']
tipo_gol = list(set(tipo_gol_repetido))

penales = tipo_gol_repetido.count('Penalty')
cabeza = tipo_gol_repetido.count('Header')
pie_derecho = tipo_gol_repetido.count('Right-footed shot')
pie_izquierdo = tipo_gol_repetido.count('Left-footed shot')

tiros_libres = 0

for gol in tipo_gol_repetido:
    if 'kick' in gol:
        tiros_libres += 1

in_game = 710 - penales - tiros_libres

# #########LIGAS###########

ligas_repetidas = [linea[1] for linea in info[1:]]
ligas = list(set(ligas_repetidas))
ligas.remove('UEFA Champions League Qualifying')

cantidad_total = 0
ligas_goles = {liga: 0 for liga in ligas}
for liga in ligas:
    if liga == 'UEFA Champions League Qualifying':
        liga = 'UEFA Champions League'
    ligas_goles[liga] = ligas_repetidas.count(liga)
    cantidad_total += ligas_goles[liga]


# #########JSON###########
data = {
    'clubes': clubes_goles,
    'anos': cantidad_goles_año,
    'tipos_goles': {
        'penales': penales,
        'cabeza': cabeza,
        'pie_derecho': pie_derecho,
        'pie_izquierdo': pie_izquierdo,
        'tiros_libres': tiros_libres,
        'in_game': in_game
    },
    'ligas': ligas_goles
}

with open('data.json', 'w', encoding='UTF-8') as file:
    json.dump(data, file, indent=4)
