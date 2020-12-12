#!/usr/bin/env bash
cd /home/aufa/corpus/working/mert-work
/home/aufa/smt/mosesdecoder/bin/extractor --sctype BLEU --scconfig case:true  --scfile run5.scores.dat --ffile run5.features.dat -r /home/aufa/corpus/test.true.id -n run5.best100.out.gz
