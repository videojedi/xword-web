<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  const basicCode = ` 100  CLEAR
 110  ONERR  GOTO 50000
 120 D$ =  CHR$ (4)
 130  PRINT D$;"PR#3"
 140  DIM A$(16,8,25),B$(3000),C$(16),P$(16),W$(16),WW$(16),A(16),B(26),J(16,8),CC(16)
 150  DATA 1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
 160  FOR I = 1 TO 26
 170  READ B(I)
 180 B(I) =  INT ( LOG (B(I)) * 1E8 + .5)
 190  NEXT
 200  PRINT D$;"CREATE/RAM5/DATA"
 210  VTAB 12
 220  GOSUB 45000
 230  PRINT D$;"CLOSE"
 240  HOME :M$ = "CROSSWORD SOLVING AID":MM$ = "BY C.A. SMALL ... APRIL 1988"
 250 M =  LEN (M$):MM =  LEN (MM$)
 260  VTAB 2: HTAB (79 - M) / 2: PRINT M$
 270  VTAB 4: HTAB (79 - MM) / 2: PRINT MM$
 280  VTAB 8: HTAB (20): PRINT "ENTER NEW WORDS IN DICTIONARY ........A"
 290  VTAB 10: HTAB (20): PRINT "REMOVE DICTIONARY ENTRIES ............B"
 300  VTAB 12: HTAB (20): PRINT "RECALL - PART WORD ...................C"
 310  VTAB 14: HTAB (20): PRINT "SOLVE ANAGRAM ........................D"
 330  VTAB 16: HTAB (20): PRINT "SORT AND QUIT ........................E"
 350  VTAB 20: HTAB (26): PRINT "ENTER LETTER OF YOUR CHOICE"
 360  GET R$
 370  IF  ASC (R$) > 64 AND  ASC (R$) < 71 THEN R$ =  CHR$ ( ASC (R$) + 32)
 380  IF  ASC (R$) < 97 OR  ASC (R$) > 102 THEN 350
 390 C =  ASC (R$) - 96
 400  HOME
 410  IF C >  < 1 GOTO 440
 420  GOSUB 1000
 430  GOTO 240
 440  IF C >  < 2 GOTO 470
 450  GOSUB 30420
 460  GOTO 240
 470  IF C >  < 3 GOTO 500
 480  GOSUB 30000
 490  GOTO 240
 500  IF C >  < 4 GOTO 550
 510  GOSUB 25000
 550  IF C >  < 5 GOTO 240
 552  HOME : VTAB 10: HTAB (20)
 554  PRINT "DISPLAY WORDS ? ...... Y(es) or N(o) "
 555  PRINT : HTAB (20)
 556  GET W$: IF W$ = "N" OR W$ = "n" THEN MK = 1
 560  GOSUB 20000
 570  END

1000  INPUT "Enter WORD (3 to 16 characters)                     ";W$
1010  IF W$ = "" GOTO 1000
1020 L =  LEN (W$)
1030  IF L < 3 OR L > 16 GOTO 1000
1040  GOSUB 2000
1050  IF P$ = "" GOTO 1000
1060  IF  ASC (P$) > 96 AND  ASC (P$) < 99 THEN LM = 1
1065  IF  ASC (P$) > 98 AND  ASC (P$) < 101 THEN LM = 2
1070  IF  ASC (P$) > 100 AND  ASC (P$) < 104 THEN LM = 3
1075  IF  ASC (P$) > 103 AND  ASC (P$) < 108 THEN LM = 4
1080  IF  ASC (P$) > 107 AND  ASC (P$) < 112 THEN LM = 5
1082  IF  ASC (P$) > 111 AND  ASC (P$) < 115 THEN LM = 6
1084  IF  ASC (P$) = 115 THEN LM = 7
1086  IF  ASC (P$) > 115 AND  ASC (P$) < 123 THEN LM = 8
1090  IF J(L,LM) = 0 GOTO 1130
1100  FOR I = 1 TO J(L,LM)
1110  IF P$ = A$(L,LM,I) THEN  GOTO 1170
1120  NEXT I
1130 J(0,0) = J(0,0) + 1
1140 J(L,LM) = J(L,LM) + 1
1150 A$(L,LM,J(L,LM)) = P$
1160  IF J(L,LM) = 25 THEN  GOTO 1230
1170  PRINT "Do you wish to enter another word ? "
1180  PRINT "Y(es) or N(o) "
1190  GET W$
1200  IF W$ = "Y" OR W$ = "y" GOTO 1000
1210  IF W$ = "N" OR W$ = "n" GOTO 1230
1220  PRINT  CHR$ (7): GOTO 1190
1230  GOSUB 5000
1240  RETURN

2000 P$ = ""
2010  FOR I = 1 TO L
2020 T% =  ASC ( MID$ (W$,I,1))
2030  IF T% < 65 OR T% > 122 THEN P$ = "": RETURN
2040  IF T% > 90 AND T% < 97 THEN P$ = "": RETURN
2050  IF T% > 90 THEN 2070
2060 T% = T% + 32
2070 P$(I) =  CHR$ (T%)
2080 P$ = P$ + P$(I)
2090  NEXT I
2100  RETURN

5000  FOR BL = 1 TO 2: PRINT  CHR$ (7): NEXT
5010  PRINT : HTAB 24: PRINT "WORDS BEING PROCESSED   --   PLEASE WAIT": PRINT
5020  PRINT D$;"PREFIX/RAM5/DATA"
5030  IF J(0,0) = 0 THEN  GOTO 5390
5040  FOR L = 3 TO 16
5050  FOR Q = 1 TO 8
5060  IF J(L,Q) = 0 GOTO 5320
5070  PRINT D$;"OPEN L";L;".";Q
5080  PRINT D$;"READ L";L;".";Q
5100  INPUT T
5110  IF T = 1000 GOTO 5150
5120  FOR K = 1 TO (T - 1000)
5130  INPUT B$(K)
5140  NEXT K
5150  PRINT D$;"CLOSE L";L;".";Q
5160 HI = 0
5170  FOR K = 1 TO T - 1000
5180  FOR H = 1 TO J(L,Q)
5190  IF B$(K) = A$(L,Q,H) THEN A$(L,Q,H) = "":HI = HI + 1
5200  NEXT H
5210  NEXT K
5220 T = T + J(L,Q) - HI
5230  PRINT D$;"OPEN L";L;".";Q
5240  PRINT D$;"WRITE L";L;".";Q
5250  PRINT T
5260  FOR G = 1 TO J(L,Q)
5270  IF A$(L,Q,G) = "" THEN  GOTO 5300
5280  PRINT D$;"APPEND L";L;".";Q
5290  PRINT A$(L,Q,G)
5300  NEXT G
5310  PRINT D$;"CLOSE L";L;".";Q
5320  NEXT Q
5330  NEXT L
5340  FOR BL = 1 TO 4: PRINT  CHR$ (7): NEXT
5350  IF W$ = "N" OR W$ = "n" GOTO 5390
5370  GOTO 1000
5390  RETURN

15000  HOME : VTAB 12: HTAB (35)
15010  PRINT "FILE L";L;".";Q
15020  PRINT D$;"CLOSE"
15040  PRINT D$;"PREFIX/XWORD/DATA"
15050  PRINT D$;"OPEN L";L;".";Q
15060  PRINT D$;"READ L";L;".";Q
15070  INPUT TX
15080  PRINT D$;"CLOSE L";L;".";Q
15090  PRINT D$;"PREFIX/RAM5/DATA"
15100  PRINT D$;"OPEN L";L;".";Q
15110  PRINT D$;"READ L";L;".";Q
15120  INPUT T
15130  IF TX = T THEN  POP : GOTO 20175
15140  HTAB 24: PRINT "THERE ARE ";T - 1000;" WORDS IN FILE L";L;".";Q
15150  FOR W = 1 TO 15000: NEXT
15160  FOR I = 1 TO T - 1000
15170 I$ =  STR$ (I)
15180  INPUT B$(I)
15190  IF MK THEN  GOTO 15250
15200  PRINT  SPC( 4 -  LEN (I$));I;" ";B$(I);
15210 U =  PEEK (1403)
15220 U = U + 3
15230  IF U > 75 - L THEN U = 0: PRINT
15240  POKE 1403,U
15250  NEXT I
15260  PRINT D$;"CLOSE L";L;".";Q
15280  PRINT : PRINT : HTAB 30: PRINT "SORTING IN PROGRESS": PRINT : PRINT
15290 N = T - 1000
15300 M = N
15310 S = M / 2
15320 M =  INT (S)
15330  IF M = 0 THEN 15470
15340 K = N - M
15350 J = 1
15360 I = J
15370 G = I + M
15380  IF B$(I) <  = B$(G) THEN 15440
15390 T$ = B$(I)
15400 B$(I) = B$(G)
15410 B$(G) = T$
15420 I = I - M
15430  IF I >  = 1 THEN 15370
15440 J = J + 1
15450  IF J > K THEN 15310
15460  GOTO 15360
15470  PRINT D$;"OPEN L";L;".";Q
15480  PRINT D$;"WRITE L";L;".";Q
15490  PRINT T
15500  FOR I = 1 TO T - 1000
15510  PRINT B$(I)
15520  NEXT I
15530  PRINT D$;"CLOSE L";L;".";Q
15540  RETURN

20000  VTAB 12: HTAB (20): PRINT "DO YOU WISH TO QUIT ?  (Y/N)"
20010  GET R$
20020  IF R$ = "Y" OR R$ = "y" THEN  GOTO 20040
20030  POP : GOTO 240
20040 TT = 0
20050  FOR L = 3 TO 16
20060  FOR Q = 1 TO 8
20070  PRINT D$;"PREFIX/RAM5/DATA"
20080  GOSUB 15000
20085  PRINT : PRINT : HTAB 32: PRINT "STORING TO DISC"
20090  PRINT D$;"PREFIX/XWORD/DATA"
20100  PRINT D$;"OPEN L";L;".";Q
20110  PRINT D$;"WRITE L";L;".";Q
20120  PRINT T
20140  FOR I = 1 TO T - 1000
20150  PRINT B$(I)
20160  NEXT I
20170  PRINT D$;"CLOSE L";L;".";Q
20175 TT = TT + T - 1000
20180  NEXT Q
20190  NEXT L
20200  PRINT "Total words stored is ";TT
20210  FOR BL = 1 TO 4: PRINT  CHR$ (7): NEXT
20230  RETURN

25000  REM === ANAGRAM SOLVER ===
25010  PRINT D$;"PREFIX/RAM5/DATA"
25020  HOME :J1 = 0:X = 0
25030  FOR I = 0 TO 16:W$(I) = "":WW$(I) = "":A(I) = 0: NEXT I
25040  VTAB 12: INPUT "Enter ANAGRAM letters        ";W$
25050 L =  LEN (W$): IF L < 3 OR L > 16 THEN 25030
25060  GOSUB 2000: REM  CONVERT TO LOWER CASE LETTERS
25070  IF P$ = "" GOTO 25000
25080  FOR I = 1 TO L
25090 A(I) =  ASC ( MID$ (P$,I,1))
25100 X = B(A(I) - 96) + X
25110 W$(I) =  CHR$ (A(I))
25120  NEXT I
25130 A = X
25140  FOR II = 1 TO L
25150  FOR I = 2 TO L
25160  IF W$(I - 1) > W$(I) THEN W$(0) = W$(I - 1):W$(I - 1) = W$(I):W$(I) = W$(0)
25170  NEXT I
25180  NEXT II
25190  FOR I = 1 TO 8:Q$(I) = "": NEXT I
25200  FOR I = 1 TO L
25210  IF W$(I) <  CHR$ (99) AND W$(I) > Q$(1) THEN Q$(1) = W$(I): GOTO 25260
25220  IF W$(I) <  CHR$ (101) AND W$(I) >  CHR$ (98) AND W$(I) > Q$(2) THEN Q$(2) = W$(I): GOTO 25260
25230  IF W$(I) <  CHR$ (104) AND W$(I) >  CHR$ (100) AND W$(I) > Q$(3) THEN Q$(3) = W$(I): GOTO 25260
25240  IF W$(I) <  CHR$ (108) AND W$(I) >  CHR$ (103) AND W$(I) > Q$(4) THEN Q$(4) = W$(I): GOTO 25260
25242  IF W$(I) <  CHR$ (112) AND W$(I) >  CHR$ (107) AND W$(I) > Q$(5) THEN Q$(5) = W$(I): GOTO 25260
25244  IF W$(I) <  CHR$ (115) AND W$(I) >  CHR$ (111) AND W$(I) > Q$(6) THEN Q$(6) = W$(I): GOTO 25260
25246  IF W$(I) <  CHR$ (116) AND W$(I) >  CHR$ (114) AND W$(I) > Q$(7) THEN Q$(7) = W$(I): GOTO 25260
25250  IF W$(I) > Q$(8) AND W$(I) >  CHR$ (115) THEN Q$(8) = W$(I)
25260  NEXT I
25270  PRINT : PRINT "SEARCHING  --  PLEASE WAIT": PRINT
25280  FOR Q = 1 TO 8
25290  IF Q$(Q) = "" THEN  GOTO 25440
25300  PRINT D$;"OPEN L";L;".";Q
25310  PRINT D$;"READ L";L;".";Q
25320  INPUT J1
25330  IF J1 = 1000 THEN  PRINT "NO WORDS OF ";L;" CHARACTERS": GOTO 25440
25340  FOR N = 1 TO J1 - 1000
25350  INPUT C$(0)
25360  IF  MID$ (C$(0),1,1) > Q$(Q) THEN  GOTO 25440
25370 X = 0
25380  FOR I = 1 TO L
25390 A(I) =  ASC ( MID$ (C$(0),I,1))
25400 X = B(A(I) - 96) + X
25410  NEXT I
25420  IF A = X THEN  PRINT C$(0)
25430  NEXT N
25440  PRINT D$;"CLOSE L";L;".";Q
25450  NEXT Q
25460  PRINT
25470  PRINT "Do you wish to search for other anagrams ?"
25480  PRINT "Y(es) or N(o)"
25490  GET W$
25500  IF W$ = "Y" OR W$ = "y" THEN  HOME : GOTO 25010
25510  IF W$ = "N" OR W$ = "n" THEN  GOTO 25530
25520  GOTO 25490
25530  RETURN

30000  REM === WILDCARD SEARCH ===
30010  PRINT D$;"PREFIX/RAM5/DATA"
30020  HOME : PRINT "NUMBER of CHARACTERS = ";: GET K$
30025  IF  ASC (K$) < 48 OR  ASC (K$) > 57 THEN  GOTO 30020
30027  PRINT K$;
30030  IF  VAL (K$) > 1 THEN  PRINT : GOTO 30050
30040  GET KK$
30042  IF  ASC (KK$) < 48 OR  ASC (KK$) > 54 THEN  GOTO 30040
30045  PRINT KK$:K$ = K$ + KK$
30050 L =  VAL (K$)
30060  IF L < 3 OR L > 16 GOTO 30020
30070  PRINT : PRINT "ENTER CHARACTER AGAINST POSITION NUMBER": PRINT
30080  PRINT "     USE 'SPACEBAR' FOR NULL": PRINT
30090  FOR I = 1 TO L
30100  PRINT "   ";I;" = ";
30102  GET C$(I)
30104  IF  ASC (C$(I)) = 32 THEN  GOTO 30138
30106  IF  ASC (C$(I)) < 97 THEN C$(I) =  CHR$ ( ASC (C$(I)) + 32)
30108  IF  ASC (C$(I)) > 122 THEN  GOTO 30102
30110  IF  ASC (C$(I)) < 97 THEN  GOTO 30102
30138  PRINT C$(I)
30140  NEXT I
30141  IF  ASC (C$(1)) = 32 GOTO 30150
30142  IF  ASC (C$(1)) < 99 THEN Z(0) = 1:Z(1) = 1: GOTO 30155
30143  IF  ASC (C$(1)) < 101 THEN Z(0) = 2:Z(1) = 2: GOTO 30155
30144  IF  ASC (C$(1)) < 104 THEN Z(0) = 3:Z(1) = 3: GOTO 30155
30145  IF  ASC (C$(1)) < 108 THEN Z(0) = 4:Z(1) = 4: GOTO 30155
30146  IF  ASC (C$(1)) < 112 THEN Z(0) = 5:Z(1) = 5: GOTO 30155
30147  IF  ASC (C$(1)) < 115 THEN Z(0) = 6:Z(1) = 6: GOTO 30155
30148  IF  ASC (C$(1)) < 116 THEN Z(0) = 7:Z(1) = 7: GOTO 30155
30149 Z(0) = 8:Z(1) = 8: GOTO 30155
30150 Z(0) = 1:Z(1) = 8
30155  FOR Q = Z(0) TO Z(1)
30160  PRINT D$;"OPEN L";L;".";Q
30170  PRINT D$;"READ L";L;".";Q
30180  INPUT J1
30190  IF J1 = 1000 THEN  PRINT "NO WORDS OF ";L;" CHARACTERS": GOTO 30340
30195  IF  ASC (C$(1)) > 99 THEN  GOTO 30210
30200  IF Q > 1 GOTO 30220
30210  PRINT : PRINT "SEARCHING  --  PLEASE WAIT": PRINT
30220  FOR N = 1 TO J1 - 1000
30230  INPUT B$(0)
30240  FOR I = 1 TO L
30250  IF C$(I) = " " THEN 30270
30255  IF  MID$ (B$(0),1,1) > C$(1) AND  ASC (C$(1)) > 32 THEN 30340
30260  IF C$(I) >  <  MID$ (B$(0),I,1) THEN 30330
30270  NEXT I
30280  PRINT B$(0);
30290 U =  PEEK (1403)
30300 U = U + 3
30310  IF U > 80 - L THEN U = 0: PRINT
30320  POKE 1403,U
30330  NEXT N
30340  PRINT D$;"CLOSE L";L;".";Q
30350  NEXT Q
30360  PRINT
30370  HTAB 12: PRINT "Do you wish to SEARCH for another WORD ?  Y(es) or N(o)";
30380  GET W$
30390  IF W$ = "Y" OR W$ = "y" THEN  HOME : GOTO 30020
30400  IF W$ = "N" OR W$ = "n" GOTO 30420
30410  GOTO 30380
30420  RETURN

30430  REM === REMOVE WORDS ===
30440  PRINT D$;"PREFIX/RAM5/DATA"
35000 P$ = "": HOME
35010  VTAB 10: HTAB 21: INPUT "WHAT LENGTH OF WORD FOR REMOVAL ? ";K$
35012  IF  VAL (K$) < 3 AND  VAL (K$) > 16 THEN  GOTO 35010
35015  VTAB 15: HTAB 21: PRINT "USE 'CONTROL-S' TO HALT WORD LISTING"
35016  FOR D = 1 TO 20000: NEXT D
35040 L =  VAL (K$)
35050  IF L < 3 OR L > 16 GOTO 35000
35055  HOME : VTAB 10: HTAB 21: PRINT "WHICH SECTION CONTAINS FIRST LETTER"
35057  PRINT : HTAB (24): PRINT "a to b ...................... 1"
35058  PRINT : HTAB (24): PRINT "c to d ...................... 2"
35059  PRINT : HTAB (24): PRINT "e to g ...................... 3"
35060  PRINT : HTAB (24): PRINT "h to k ...................... 4"
35061  PRINT : HTAB (24): PRINT "l to o ...................... 5"
35062  PRINT : HTAB (24): PRINT "p to r ...................... 6"
35063  PRINT : HTAB (24): PRINT "s ........................... 7"
35064  PRINT : HTAB (24): PRINT "t to z ...................... 8"
35067  GET Q
35068  IF Q < 1 OR Q > 8 GOTO 35067
35080  PRINT D$;"OPEN L";L;".";Q
35090  PRINT D$;"READ L";L;".";Q
35100  INPUT T:TT = T
35110  IF T = 1000 THEN  GOTO 35130
35120  GOTO 35140
35130  PRINT "NO WORDS OF ";L;" CHARACTERS EXIST": GOTO 35230
35140  FOR I = 1 TO T - 1000
35150 I$ =  STR$ (I)
35160  INPUT B$(I)
35170  PRINT  SPC( 4 -  LEN (I$));I;" ";B$(I);
35180 U =  PEEK (1403)
35190 U = U + 3
35200  IF U > 75 - L THEN U = 0: PRINT
35210  POKE 1403,U
35220  NEXT I
35230  PRINT D$;"CLOSE L";L;".";Q
35240  PRINT
35250  PRINT : INPUT "WHICH NUMBER WORD IS TO BE REMOVED (0 FOR NONE) ";R
35260  IF R = 0 GOTO 35420
35265  IF R > T - 1000 GOTO 35250
35270  PRINT : INPUT "ARE YOU SURE YOU WANT TO REMOVE THAT ENTRY ? Y(es) or N(o) ";W$
35280  IF W$ = "" GOTO 35270
35290  IF W$ = "Y" OR W$ = "y" THEN TT = TT - 1:P$ = W$: GOTO 35310
35300  GOTO 35420
35310 B$(R) = P$
35320  PRINT D$;"DELETE L";L;".";Q
35330  PRINT D$;"OPEN L";L;".";Q
35340  PRINT D$;"WRITE L";L;".";Q
35341  FOR JJ = 1 TO 2
35342  IF JJ = 2 THEN  PRINT D$;"OPEN/XWORD/DATA/L";L;".";Q: PRINT D$;"WRITE/XWORD/DATA/L";L;".";Q
35350  PRINT TT
35360  FOR I = 1 TO T - 1000
35370  IF B$(I) = "Y" OR B$(I) = "y" GOTO 35390
35380  PRINT B$(I)
35390  NEXT I
35391  IF JJ = 2 THEN  PRINT D$;"CLOSE/XWORD/DATA/L";L;".";Q
35392  NEXT JJ
35400  PRINT D$;"CLOSE L";L;".";Q
35420  PRINT : PRINT : PRINT : PRINT "Do you wish to make other corrections ?"
35430  PRINT : PRINT "  Y(es) or N(o)"
35440  GET W$
35450  IF W$ = "Y" OR W$ = "y" GOTO 35000
35460  IF W$ = "N" OR W$ = "n" GOTO 35480
35470  GOTO 35440
35480  RETURN

39999  REM === CLEAR REGISTERS ===
40000  FOR I = 0 TO 16
40010  FOR IJ = 1 TO 8
40020 J(I,IJ) = 0
40030  FOR II = 0 TO 25
40040 A$(I,IJ,II) = ""
40050  NEXT II
40060  NEXT IJ
40070  NEXT I
40080  FOR I = 1 TO 3000
40090 B$(I) = ""
40100  NEXT I
40110  RETURN

44999  REM === LOAD RAM WITH WORDS FROM DATA FILES ON DISK ===
45000  FOR L = 3 TO 16
45010  FOR Q = 1 TO 8
45020  HOME : VTAB 12: PRINT "LOADING FILE L";L;".";Q;" INTO RAM"
45030  PRINT D$;"PREFIX/XWORD/DATA"
45050  PRINT D$;"OPEN L";L;".";Q
45060  PRINT D$;"READ L";L;".";Q
45070  INPUT T
45080  FOR I = 1 TO T - 1000
45090  INPUT B$(I)
45100  NEXT I
45110  PRINT D$;"CLOSE L";L;".";Q
45120  PRINT D$;"PREFIX/RAM5/DATA"
45130  PRINT D$;"OPEN L";L;".";Q
45140  PRINT D$;"WRITE L";L;".";Q
45150  PRINT T
45160  FOR I = 1 TO T - 1000
45170  PRINT B$(I)
45180  NEXT I
45190  PRINT D$;"CLOSE L";L;".";Q
45210  NEXT Q
45220  NEXT L
45230  RETURN

50000  REM === ERROR HANDLER ===
50010 E =  PEEK (222)
50020  PRINT "ERROR CODE ";E
50030  IF E = 19 THEN  GOTO 230
50040  IF E = 8 THEN  PRINT "I/O ERROR"
50050  IF E = 77 THEN  PRINT "OUT OF MEMORY"
50060  END`;
</script>

<div class="overlay" on:click={close} on:keydown={(e) => e.key === 'Escape' && close()} role="dialog" tabindex="-1">
  <div class="modal" on:click|stopPropagation role="document">
    <button class="close-btn" on:click={close}>✕</button>

    <h1>Original AppleSoft BASIC Code</h1>
    <p class="subtitle">XWORD.TXT - Crossword Solving Aid by C.A. Small (April 1988)</p>

    <div class="content">
      <section class="description">
        <h2>How It Works</h2>

        <h3>Overview</h3>
        <p>
          This program is a crossword puzzle solving aid written in AppleSoft BASIC for the Apple II computer.
          It maintains a dictionary of words organized by length (3-16 characters) and first-letter groups,
          allowing users to search for partial words and find anagrams.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Dictionary Management:</strong> Add and remove words from a persistent dictionary stored on floppy disk (or RAM disk).</li>
          <li><strong>Wildcard Search:</strong> Find words matching a pattern where unknown letters are marked with spaces. For example, "C_T" would match CAT, COT, CUT, etc.</li>
          <li><strong>Anagram Solver:</strong> Find all dictionary words that are anagrams of given letters.</li>
        </ul>

        <h3>The Anagram Algorithm</h3>
        <p>
          The cleverest part of this code is the anagram detection algorithm (lines 150-190, 25080-25130).
          Instead of sorting letters and comparing, it uses a mathematical hash:
        </p>
        <ol>
          <li>Each letter A-Z is assigned a prime number (A=2, B=3, C=5, D=7, ...)</li>
          <li>The hash of a word is the sum of LOG values of each letter's prime</li>
          <li>Two words are anagrams if and only if their hashes match</li>
        </ol>
        <p>
          This is elegant because LOG(a) + LOG(b) = LOG(a×b), and prime factorization is unique.
          So "CAT" and "ACT" produce the same hash since 5×2×71 = 2×5×71.
        </p>

        <h3>Data Organization</h3>
        <p>
          Words are stored in files named L&#123;length&#125;.&#123;bucket&#125; where:
        </p>
        <ul>
          <li>Length = 3 to 16 characters</li>
          <li>Bucket 1-8 based on first letter: (a-b, c-d, e-g, h-k, l-o, p-r, s, t-z)</li>
        </ul>
        <p>
          This organization speeds up searches by limiting which files need to be scanned.
        </p>

        <h3>BASIC Commands Used</h3>
        <ul>
          <li><code>HOME</code> - Clear screen</li>
          <li><code>VTAB n / HTAB n</code> - Position cursor</li>
          <li><code>PRINT</code> - Output text</li>
          <li><code>INPUT</code> - Get user input with prompt</li>
          <li><code>GET</code> - Get single keypress (no Enter needed)</li>
          <li><code>CHR$(4)</code> - ProDOS disk commands prefix</li>
          <li><code>PEEK / POKE</code> - Direct memory access</li>
        </ul>
      </section>

      <section class="code-section">
        <h2>Complete Source Code</h2>
        <pre><code>{basicCode}</code></pre>
      </section>
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal {
    background: #1a1a2e;
    border-radius: 15px;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 30px;
    position: relative;
    border: 1px solid #33ff33;
    box-shadow: 0 0 30px rgba(51, 255, 51, 0.2);
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: #33ff33;
    font-size: 24px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .close-btn:hover {
    background: rgba(51, 255, 51, 0.2);
  }

  h1 {
    color: #33ff33;
    font-family: 'Courier New', monospace;
    margin: 0 0 5px 0;
    font-size: 24px;
  }

  .subtitle {
    color: #00cc00;
    font-family: 'Courier New', monospace;
    margin: 0 0 25px 0;
    font-size: 14px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .description, .code-section {
    background: #0f0f1a;
    border-radius: 10px;
    padding: 20px;
  }

  h2 {
    color: #33ff33;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
  }

  h3 {
    color: #00cc00;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    margin: 15px 0 10px 0;
  }

  p {
    color: #aaa;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    margin: 0 0 10px 0;
  }

  ul, ol {
    color: #aaa;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.8;
    margin: 0 0 10px 0;
    padding-left: 25px;
  }

  li {
    margin-bottom: 5px;
  }

  strong {
    color: #33ff33;
  }

  code {
    background: #1a1a2e;
    color: #33ff33;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
  }

  pre {
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    overflow-x: auto;
    margin: 0;
    max-height: 500px;
    overflow-y: auto;
  }

  pre code {
    background: none;
    padding: 0;
    color: #33ff33;
    font-size: 11px;
    line-height: 1.4;
    white-space: pre;
  }
</style>
