Il progetto di ricerca industriale S.A.F.E Project ha come obiettivo la realizzazione di sistemi di arredo innovativi capaci di trasformarsi in sistemi intelligenti
di protezione passiva delle persone in caso di crollo dell’edificio causato da un
terremoto.
Questi sistemi di arredo smart saranno dotati di sensoristica "salva-vita"
capace di pre-allertare in caso di terremoto, di rilevare e localizzare la presenza
di vita dopo un crollo, di monitorare le condizioni ambientali sotto le macerie e
di elaborare e trasmettere informazioni utili a chi deve portare soccorso.
Il ciclo di vita dei sensori si divide in tre scenari operativi:
i. Tempo di pace: monitoraggio per il pre-allertamento (es. misure accellerometriche)
ii. Durante l’evento: invio dei dati per il rilevamento dei danni (es. misure accellerometriche, inclinometriche e di spostamento) e attivazione di
logiche di intervento in seguito al riconoscimento dell’evento.
iii. Dopo l’evento: invio dei dati per la localizzazione delle vittime e monitoraggio ambientale al fine di guidare gli operatori nel triage di soccorso.
L’invio di dati tra i sensori ed il mondo esterno avviene utilizzando la tecnologia LoRa.
LoRa consente trasmissioni a lungo raggio e a basso consumo energetico arrivando oltre 10 km nelle zone rurali e 3–5 km in zone fortemente urbanizzate.[2]
Facendo riferimento al modello ISO/OSI la tecnologia è presente in due
strati:
• LoRa: Il livello fisico LoRa è proprietario della Semtech e non se ne conoscono i dettagli implementativi. LoRa utilizza una modulazione a spettro
espanso proprietaria, derivata della modulazione Chirp Spread Spectrum
(CSS). Inoltre utilizza la codifica Forward Error Correction (FEC) come
meccanismo di rilevazione e successiva correzione degli errori contro le
interferenze.
• LoRaWAN: LoRaWAN è un protocollo del livello Media Access Control
(MAC) che lavora a livello di rete per la gestione delle comunicazioni tra
gateway Low Power Wide Area Network (LPWAN) e dispositivi end-node
come protocollo di routing.
2
Lo scenario operativo post evento si divide in tre attività:
i. Campionatura: mediante l’utilizzo di un drone dotato di tecnologia che
supporta il protocollo LoRaWAN viene campionata l’area coperta dalle
macerie. Durante la fase di volo vengono memorizzati i dati ricevuti dai
sensori e la potenza del segnale.
ii. Analisi dati: sfruttando opportuni algoritmi di localizzazione vengono
analizzati i dati memorizzati dal drone così da determinare dei centroidi
in cui si suppone si trovi il disperso.
iii. Guidare soccoritori: i soccoritori, dotati di opportuni tablet, visualizzerano una mappa con la heatmap e i centroidi risultanti dall’attività di
analisi dati, così da potersi orientare per individuare i dispersi.
Il nostro progetto, all’interno di S.A.F.E., ha l’obiettivo di creare un applicativo per tablet android utile nell’ultima attività post evento.
Trovandosi in uno stato d’emergenza, l’applicazione punta ad avere un interfaccia grafica semplice e funzionale così da agevolare il lavoro degli operatori.
Inoltre, dovrà essere in grado di funzionare senza connessione interne.
